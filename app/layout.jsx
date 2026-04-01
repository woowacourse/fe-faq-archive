import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'

export const metadata = {
  title: '우테코 FE 미션 아카이브',
  description: '우아한테크코스 프론트엔드 미션 PR 아카이브',
}

export default async function RootLayout({ children }) {
  const pageMap = await getPageMap()

  return (
    <html lang="ko" suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          pageMap={pageMap}
          docsRepositoryBase="https://github.com/woowacourse/fe-faq-archive"
          navbar={<Navbar logo={<span style={{ fontWeight: 'bold' }}>📚 우테코 FE 미션 아카이브</span>} />}
          footer={<Footer>우아한테크코스 프론트엔드</Footer>}
          sidebar={{ defaultMenuCollapseLevel: 1 }}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
