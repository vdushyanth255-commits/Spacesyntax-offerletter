const puppeteer = require('puppeteer');

exports.renderForm = (req, res) => {
    res.render('offer-letter', {
        candidateName: '',
        position: '',
        salary: '',
        startDate: '',
        companyName: 'Spacesyntax'
    });
};

exports.generateOfferLetter = async (req, res) => {
    try {
        const { candidateName, position, salary, startDate, companyName = 'Spacesyntax' } = req.body;

        const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; padding: 50px; line-height: 1.8; }
                .header { text-align: center; margin-bottom: 40px; }
                .content { max-width: 800px; margin: 0 auto; }
                h1 { color: #1e3a8a; }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>${companyName} - Offer of Employment</h1>
            </div>
            <div class="content">
                <p><strong>Date:</strong> ${new Date().toLocaleDateString('en-IN')}</p>
                <br>
                <p>Dear <strong>${candidateName}</strong>,</p>
                <p>We are pleased to offer you the position of <strong>${position}</strong> at ${companyName}.</p>
                
                <h3>Compensation Details:</h3>
                <p>Annual CTC: <strong>₹${Number(salary).toLocaleString('en-IN')}/-</strong></p>
                <p>Start Date: <strong>${startDate}</strong></p>
                
                <br>
                <p>We are excited to have you join our team and look forward to your contributions.</p>
                <br>
                <p>Best regards,<br>
                HR Department<br>
                ${companyName}</p>
            </div>
        </body>
        </html>`;

        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.setContent(html);
        
        const pdfBuffer = await page.pdf({ 
            format: 'A4',
            printBackground: true,
            margin: { top: '40px', bottom: '40px', left: '40px', right: '40px' }
        });

        await browser.close();

        const fileName = `${candidateName.replace(/\s+/g, '_')}_Offer_Letter.pdf`;

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
        res.send(pdfBuffer);

    } catch (error) {
        console.error(error);
        res.status(500).send('Error generating PDF');
    }
};