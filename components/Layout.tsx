import Head from 'next/head';

export interface LayoutProps {
    children: React.ReactNode | React.ReactNode[];
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <main className="container">
            <Head>
                <title>SpaceX Launches</title>
            </Head>

            {children}

            <style jsx>{`
                .container {
                    max-width: 1280px;
                    margin: 0 auto;
                    padding: 0 50px;
                }
            `}</style>
        </main>
    );
};
