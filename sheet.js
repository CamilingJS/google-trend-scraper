import 'dotenv/config';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

const serviceAccountAuth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
const doc = new GoogleSpreadsheet(process.env.GOOGLE_URL_ID, serviceAccountAuth);

export default class Sheet {
    constructor() {
        this.doc = doc
    }
    async load() {
        await this.doc.loadInfo(); // loads document properties and worksheets
    }
    async addRows(rows) {
        const sheet = this.doc.sheetsByIndex[0]; // or use `doc.sheetsById[id]` or `doc.sheetsByTitle[title]`
        await sheet.addRows(rows);
    }
}
