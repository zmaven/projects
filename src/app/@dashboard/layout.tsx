import { Nav } from '@/components/shared';

export default function DashboardLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="w-full h-screen flex items-start">
            <Nav />
            <header>Header</header>
            <main>{children}</main>
            <footer>Footer</footer>
        </div>
    );
}
