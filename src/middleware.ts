import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/admin/login",
  },
});

export const config = {
  matcher: [
    "/admin/dashboard/:path*",
    "/admin/clients/:path*",
    "/admin/contracts/:path*",
    "/admin/assets/:path*",
    "/admin/invoices/:path*",
    "/admin/inventory/:path*",
    "/admin/reports/:path*",
    "/admin/reminders/:path*",
    "/admin/messages/:path*",
    "/admin/enquiries/:path*",
    "/admin/settings/:path*",
  ],
};
