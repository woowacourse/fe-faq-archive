import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'

export const metadata = {
  title: '로또 FAQ 카드',
  description: '우아한테크코스 로또 미션 FAQ 카드',
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
          navbar={<Navbar logo={<span style={{ fontWeight: 'bold' }}>📚 로또 FAQ 카드</span>} />}
          footer={<Footer>우아한테크코스 프론트엔드</Footer>}
          sidebar={{ defaultMenuCollapseLevel: 1 }}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
