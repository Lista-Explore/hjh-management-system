import '../styles/globals.css';

export const metadata = {
  title: 'HJH Management System',
  description: 'Digital platform for Hera Jo Highway Self-Help Group',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
