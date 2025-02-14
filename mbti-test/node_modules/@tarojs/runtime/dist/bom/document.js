import { HTML, HEAD, BODY, APP, CONTAINER } from '../constants/index.js';
import { TaroDocument } from '../dom/document.js';
import env from '../env.js';

function createDocument() {
    /**
       * <document>
       *   <html>
       *     <head></head>
       *     <body>
       *       <container>
       *         <app id="app" />
       *       </container>
       *     </body>
       *   </html>
       * </document>
       */
    const doc = new TaroDocument();
    const documentCreateElement = doc.createElement.bind(doc);
    const html = documentCreateElement(HTML);
    const head = documentCreateElement(HEAD);
    const body = documentCreateElement(BODY);
    const app = documentCreateElement(APP);
    app.id = APP;
    const container = documentCreateElement(CONTAINER); // 多包一层主要为了兼容 vue
    doc.appendChild(html);
    html.appendChild(head);
    html.appendChild(body);
    body.appendChild(container);
    container.appendChild(app);
    doc.documentElement = html;
    doc.head = head;
    doc.body = body;
    return doc;
}
const document = process.env.TARO_PLATFORM === 'web' ? env.document : (env.document = createDocument());

export { document };
//# sourceMappingURL=document.js.map
