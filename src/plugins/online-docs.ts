// import { v2 as cloudinary } from 'cloudinary';
// import { PDFDocument } from 'pdf-lib';

// class OnlineDocs {
//     // constructor
//     constructor() {
//         // Configure Cloudinary
//         cloudinary.config({
//             cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//             api_key: process.env.CLOUDINARY_API_KEY,
//             api_secret: process.env.CLOUDINARY_API_SECRET,
//         });
//     }

//     /**
//      * Fetches a document from Cloudinary using its public ID.
//      * @param publicId - The public ID of the document in Cloudinary.
//      * @returns The secure URL of the document.
//      */
//     async fetch(publicId: string): Promise<string> {
//         try {
//             const doc = await cloudinary.api.resource(publicId);
//             return doc.secure_url;
//         } catch (error) {
//             console.error('Error fetching document:', error);
//             throw new Error(`Error fetching document: ${error}`);
//         }
//     }

//     /**
//      * Creates a PDF from a file URL (image or PDF).
//      * @param fileUrl - The URL of the file (image or PDF).
//      * @returns A buffer containing the PDF data.
//      */
//     async create(fileUrl: string): Promise<Buffer> {
//         try {
//             // Check if the file is already a PDF
//             if (fileUrl.endsWith('.pdf')) {
//                 // Fetch the PDF directly
//                 const response = await fetch(fileUrl);
//                 const pdfBuffer = await response.arrayBuffer();
//                 return Buffer.from(pdfBuffer); // Return the PDF as a buffer
//             }

//             // If it's not a PDF, assume it's an image and convert it to PDF
//             const response = await fetch(fileUrl);
//             const imageBuffer = await response.arrayBuffer();
//             let image = null;

//             // Create a new PDF document
//             const pdfDoc = await PDFDocument.create();

//             // Check the image format and embed it
//             if (fileUrl.endsWith('.png')) {
//                 image = await pdfDoc.embedPng(imageBuffer);
//             } else if (fileUrl.endsWith('.jpeg') || fileUrl.endsWith('.jpg')) {
//                 image = await pdfDoc.embedJpg(imageBuffer);
//             } else {
//                 throw new Error('Unsupported image format. Only PNG, JPEG, and JPG are supported.');
//             }

//             // Add a page with the image
//             const page = pdfDoc.addPage([image.width, image.height]);
//             page.drawImage(image, {
//                 x: 0,
//                 y: 0,
//                 width: image.width,
//                 height: image.height,
//             });

//             // Save the PDF to a buffer
//             const pdfBytes = await pdfDoc.save();
//             return Buffer.from(pdfBytes); // Return the PDF as a buffer
//         } catch (error) {
//             console.error('Error creating PDF:', error);
//             throw new Error(`Error creating PDF: ${error}`);
//         }
//     }
// }

// export default OnlineDocs;