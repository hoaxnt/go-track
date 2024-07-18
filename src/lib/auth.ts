import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const credentials = Credentials({
  // You can specify which fields should be submitted, by adding keys to the `credentials` object.
  // e.g. domain, username, password, 2FA token, etc.
  credentials: {
    email: {},
    password: {},
  },
    // The `authorize` method is used to check the validity of the credentials provided.
  authorize: async (credentials) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      }
    );

    if (!response.ok) return null;

    const data = await response.json();

    console.log(data);

    return data;
  },
});

const options = {
  providers: [credentials],
  trustHost: true,
  callbacks: {
    jwt: async ({ token, user, account, profile, trigger, session }: any) => {
      if (trigger === "update")
        return { ...token, ...session.user, ...account, ...profile };
      return { ...token, ...user, ...account, ...profile };
    },
    session: async ({ session, token }: any) => {
      const { iat, exp, jti, ...user } = token;

      session.user = user as any;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const handler = NextAuth(options);
