import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html lang="zh-CN">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Charis+SIL:wght@400;700&family=DM+Mono:wght@300;400;500&family=Inter:wght@400;500;700&family=Montserrat:ital,wght@0,400;0,500;0,700;1,500&family=Noto+Serif+SC:wght@300;400;500;600&family=Work+Sans:wght@300;400;500&display=swap"
            rel="preload"
            as="style"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Charis+SIL:wght@400;700&family=DM+Mono:wght@300;400;500&family=Inter:wght@400;500;700&family=Montserrat:ital,wght@0,400;0,500;0,700;1,500&family=Noto+Serif+SC:wght@300;400;500;600&family=Work+Sans:wght@300;400;500&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className="dark:bg-gray-600">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
