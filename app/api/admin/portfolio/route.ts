import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const projects = await sql`
      SELECT * FROM portfolio_projects 
      ORDER BY created_at DESC
    `;

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching portfolio projects:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      category,
      description,
      image_url,
      card_image_url,
      tags,
      client,
      project_date,
      duration,
      overview,
      challenge,
      solution,
      results,
      features,
      gallery_urls,
      is_published
    } = body;

    const result = await sql`
      INSERT INTO portfolio_projects (
        title, category, description, image_url, card_image_url, tags, client, 
        project_date, duration, overview, challenge, solution, 
        results, features, gallery_urls, is_published
      )
      VALUES (
        ${title}, ${category}, ${description}, ${image_url}, ${card_image_url}, ${tags || []}, 
        ${client}, ${project_date}, ${duration}, ${overview}, ${challenge}, 
        ${solution}, ${results}, ${features || []}, ${gallery_urls || []}, 
        ${is_published || false}
      )
      RETURNING *
    `;

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error('Error creating portfolio project:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id, is_published, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: 'Project ID required' }, { status: 400 });
    }

    // If only toggling publish status
    if (is_published !== undefined && Object.keys(updates).length === 0) {
      const result = await sql`
        UPDATE portfolio_projects 
        SET is_published = ${is_published}, updated_at = CURRENT_TIMESTAMP 
        WHERE id = ${id}
        RETURNING *
      `;

      if (result.length === 0) {
        return NextResponse.json({ error: 'Project not found' }, { status: 404 });
      }

      return NextResponse.json(result[0]);
    }

    // Full project update
    const {
      title,
      category,
      description,
      image_url,
      card_image_url,
      tags,
      client,
      project_date,
      duration,
      overview,
      challenge,
      solution,
      results,
      features,
      gallery_urls
    } = updates;

    const result = await sql`
      UPDATE portfolio_projects 
      SET 
        title = ${title},
        category = ${category},
        description = ${description},
        image_url = ${image_url},
        card_image_url = ${card_image_url},
        tags = ${tags || []},
        client = ${client},
        project_date = ${project_date},
        duration = ${duration},
        overview = ${overview},
        challenge = ${challenge},
        solution = ${solution},
        results = ${results},
        features = ${features || []},
        gallery_urls = ${gallery_urls || []},
        is_published = ${is_published !== undefined ? is_published : false},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;

    if (result.length === 0) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error updating portfolio project:', error);
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Project ID required' }, { status: 400 });
    }

    await sql`DELETE FROM portfolio_projects WHERE id = ${id}`;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting portfolio project:', error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
