import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      console.log('🚀 ~ file: auth.config.ts:9 ~ authorized ~ nextUrl:', nextUrl)
      console.log('🚀 ~ file: auth.config.ts:9 ~ authorized ~ auth:', auth)
      const isLoggedIn = !!auth?.user;
      console.log('🚀 ~ file: auth.config.ts:11 ~ authorized ~ isLoggedIn:', isLoggedIn)
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      console.log('🚀 ~ file: auth.config.ts:13 ~ authorized ~ isOnDashboard:', isOnDashboard)
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
