import Head from 'next/head';

export interface LayoutProps {
    title?: string;
    children: React.ReactNode | React.ReactNode[];
}

const SITE_TITLE = 'SpaceX Launches';

export const Layout = ({ children, title }: LayoutProps) => {
    return (
        <main className="container">
            <Head>
                <title>{title ? `${title} | ${SITE_TITLE}` : SITE_TITLE}</title>
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
