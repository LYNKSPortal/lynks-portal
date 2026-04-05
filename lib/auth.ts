import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        // Check against environment variables
        const adminUsername = process.env.ADMIN_USERNAME;
        const adminPasswordHashRaw = process.env.ADMIN_PASSWORD_HASH;
        
        // Reconstruct the full bcrypt hash (stored without $ to avoid env var parsing issues)
        const adminPasswordHash = adminPasswordHashRaw ? `$${adminPasswordHashRaw.slice(0, 2)}$${adminPasswordHashRaw.slice(2, 4)}$${adminPasswordHashRaw.slice(4)}` : null;

        console.log('Auth attempt:', {
          providedUsername: credentials.username,
          expectedUsername: adminUsername,
          hasHash: !!adminPasswordHash,
          passwordLength: credentials.password.length,
          hashLength: adminPasswordHash?.length,
        });

        if (!adminUsername || !adminPasswordHash) {
          console.error("Admin credentials not configured");
          return null;
        }

        if (credentials.username === adminUsername) {
          console.log('Testing password:', credentials.password);
          console.log('Against hash:', adminPasswordHash);
          const isValid = await bcrypt.compare(credentials.password, adminPasswordHash);
          console.log('Password valid:', isValid);
          
          if (isValid) {
            return {
              id: "1",
              name: adminUsername,
              email: adminUsername,
            };
          }
        }

        return null;
      }
    })
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};
