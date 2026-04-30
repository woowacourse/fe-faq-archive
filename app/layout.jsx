import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head, Search } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import './notion.css'

export const metadata = {
  title: '우테코 FE 미션 아카이브',
  description: '우아한테크코스 프론트엔드 미션 PR 아카이브',
}

export default async function RootLayout({ children }) {
  const pageMap = await getPageMap()

  return (
    <html lang="ko" suppressHydrationWarning>
      <Head
        faviconGlyph="▦"
        color={{ hue: { light: 205, dark: 205 }, saturation: 55, lightness: { light: 42, dark: 62 } }}
        backgroundColor={{ light: '#fbfbfa', dark: '#191919' }}
      />
      <body>
        <Layout
          pageMap={pageMap}
          docsRepositoryBase="https://github.com/woowacourse/fe-faq-archive"
          navbar={
            <Navbar
              logo={
                <span className="notion-logo" aria-label="우테코 FE 미션 아카이브">
                  <span className="notion-logo__mark">FE</span>
                  <span className="notion-logo__text">우테코 FE 미션 아카이브</span>
                </span>
              }
            />
          }
          footer={<Footer className="notion-footer">우아한테크코스 프론트엔드</Footer>}
          search={
            <Search
              placeholder="아카이브 검색"
              emptyResult="검색 결과가 없습니다."
              loading="검색 중..."
              errorText="검색 인덱스를 불러오지 못했습니다."
            />
          }
          sidebar={{ autoCollapse: true, defaultMenuCollapseLevel: 1 }}
          themeSwitch={{ dark: '어둡게', light: '밝게', system: '시스템' }}
          toc={{ title: '이 페이지', backToTop: '맨 위로' }}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
