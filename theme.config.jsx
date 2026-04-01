export default {
  logo: <span>📚 우테코 FE 미션 아카이브</span>,
  project: {
    link: 'https://github.com/woowacourse/fe-faq-archive',
  },
  docsRepositoryBase: 'https://github.com/woowacourse/fe-faq-archive',
  footer: {
    text: '우아한테크코스 프론트엔드',
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>우테코 FE 미션 아카이브</title>
    </>
  ),
  sidebar: {
    defaultMenuCollapseLevel: 1,
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s – 우테코 FE 미션 아카이브',
    }
  },
}
