import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
      preferredName?: string | null;
      title?: string | null;
      company?: string | null;
    };
  }

  interface User {
    id: string;
    preferredName?: string | null;
    title?: string | null;
    company?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
  }
}
