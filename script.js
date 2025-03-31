

// // // fully working - issue to be fixed :- Adding the first page 


// // function generatePDF(callback) {
// //     const { jsPDF } = window.jspdf;
// //     let doc = new jsPDF({
// //         unit: "mm",
// //         format: "a4",
// //         orientation: "portrait"
// //     });

// //     let marginLeft = 20;
// //     let maxWidth = 170;
// //     let lineHeight = 7;
// //     let safeMarginBottom = 270;
// //     let y;
// //     let pageNumber = 1;

// //     let img = new Image();
// //     img.src = "logo.png";

// //     img.onload = function () {
// //         const sections = [
// //             { title: "Analysis of Strength, Weakness and Behavioural Patterns", topics: ["Strengths", "Weakness", "Behavioural Patterns"] },
// //             { title: "Analysis of Luck & Fame, Monetary Aspects, Abroad Settlement", topics: ["Luck & Fame", "Monetary Aspects", "Abroad Settlement"] },
// //             { title: "Analysis of Mental and Physical Health", topics: ["Mental Health", "Physical Health"] },
// //             { title: "Analysis of Job & Business Opportunities and Government Job Possibilities", topics: ["Job Opportunities", "Business Opportunities", "Possibilities of Govt Job"] }
// //         ];

// //         doc.setFillColor(0, 0, 0);
// //         doc.setFont("helvetica", "normal");
// //         doc.setFontSize(20); // Explicitly set default content font size

// //         sections.forEach((section, index) => {
// //             doc.addPage();
// //             doc.rect(0, 0, 210, 297, "F"); 
// //             addHeader(doc, img);

// //             doc.setFont("helvetica", "bold");
// //             doc.setFontSize(22);
// //             doc.setTextColor(255, 212, 35);
// //             let titleText = doc.splitTextToSize(section.title, maxWidth);
// //             let titleHeight = titleText.length * 10;
// //             let titleY = (297 - titleHeight) / 2;

// //             titleText.forEach(line => {
// //                 let textWidth = doc.getTextWidth(line);
// //                 doc.text(line, (210 - textWidth) / 2, titleY);
// //                 titleY += 10;
// //             });

// //             addPageNumber(doc, pageNumber);
// //             pageNumber++;

// //             y = 50;

// //             doc.addPage();
// //             doc.rect(0, 0, 210, 297, "F");
// //             addHeader(doc, img);

// //             let hasContent = false;

// //             section.topics.forEach(title => {
// //                 let text = document.getElementById(title.replace(/ /g, '-')).value.trim();
// //                 if (text.length === 0) return;
// //                 hasContent = true;

// //                 if (y + 15 > safeMarginBottom) {
// //                     addPageNumber(doc, pageNumber);
// //                     pageNumber++;
// //                     doc.addPage();
// //                     doc.rect(0, 0, 210, 297, "F");
// //                     addHeader(doc, img);
// //                     y = 50;
// //                 }

// //                 doc.setFont("helvetica", "bold");
// //                 doc.setFontSize(22);
// //                 doc.setTextColor(255, 212, 35);
// //                 let topicWidth = doc.getTextWidth(title);
// //                 doc.text(title, (210 - topicWidth) / 2, y);
// //                 y += 13;

// //                 doc.setFont("helvetica", "normal");
// //                 doc.setFontSize(16);
// //                 doc.setTextColor(255, 255, 255);
                
// //                 let splitText = doc.splitTextToSize(text, maxWidth);
// //                 splitText.forEach(line => {
// //                     if (y + lineHeight > safeMarginBottom) {
// //                         addPageNumber(doc, pageNumber);
// //                         pageNumber++;
// //                         doc.addPage();
// //                         doc.rect(0, 0, 210, 297, "F");
// //                         addHeader(doc, img);
// //                         doc.setFontSize(16); // Ensure consistent font size for dynamically created pages
// //                         y = 50;
// //                     }
// //                     doc.text(line, marginLeft, y);
// //                     y += lineHeight;
// //                 });

// //                 y += 15;
// //             });

// //             if (!hasContent) {
// //                 y = 50;
// //             }

// //             addPageNumber(doc, pageNumber);
// //             pageNumber++;
// //         });
       
// //         // 🟢 Add "Signature Correction" Page
// // doc.addPage();
// // doc.rect(0, 0, 210, 297, "F"); 
// // addHeader(doc, img);

// // doc.setFont("helvetica", "bold");
// // doc.setFontSize(20);
// // doc.setTextColor(255, 212, 35);
// // let sigTitle = "Signature Correction";
// // let sigTextWidth = doc.getTextWidth(sigTitle);
// // doc.text(sigTitle, (210 - sigTextWidth) / 2, 50);

// // // 🟢 Load and insert user-uploaded signature image
// // let signatureInput = document.getElementById("signature-upload");
// // if (signatureInput && signatureInput.files.length > 0) {
// //     let file = signatureInput.files[0];
// //     let reader = new FileReader();

// //     reader.onload = function (event) {
// //         let signatureImg = new Image();
// //         signatureImg.src = event.target.result;

// //         signatureImg.onload = function () {
// //             doc.addImage(signatureImg, "PNG", 50, 65, 100, 40); // Adjusted position
// //             addSignatureHelpSection();
// //         };
// //     };
// //     reader.readAsDataURL(file);
// // } else {
// //     addSignatureHelpSection();
// // }

// // // 🟢 Add "How will this signature help" heading after the image
// // function addSignatureHelpSection() {
// //     let yPos = 140; // Adjusted position below image

// //     doc.setFont("helvetica", "bold");
// //     doc.setFontSize(18);
// //     doc.setTextColor(255, 212, 35);
// //     let helpTitle = "How will this signature help";
// //     let helpTextWidth = doc.getTextWidth(helpTitle);
// //     doc.text(helpTitle, (210 - helpTextWidth) / 2, yPos);
// //     yPos += 10;

// //     let sigText = document.getElementById("Signature-Correction").value.trim();
// //     doc.setFont("helvetica", "normal");
// //     doc.setFontSize(18);
// //     doc.setTextColor(255, 255, 255);
// //     let splitSigText = doc.splitTextToSize(sigText, maxWidth);

// //     splitSigText.forEach(line => {
// //         if (yPos + lineHeight > safeMarginBottom) {
// //             addPageNumber(doc, pageNumber);
// //             pageNumber++;
// //             doc.addPage();
// //             doc.rect(0, 0, 210, 297, "F");
// //             addHeader(doc, img);
// //             yPos = 50;
// //         }
// //         doc.text(line, marginLeft, yPos);
// //         yPos += lineHeight;
// //     });

// //     addPageNumber(doc, pageNumber);
// //     pageNumber++;
// //     appendUploadedPDFs(doc, callback);

   
// // }

        
// //     };
// // }

// // // 🟢 Function to append uploaded PDFs at the end
// // function appendUploadedPDFs(doc, callback) {
// //     let pdfInput = document.getElementById("pdf-upload");
// //     if (!pdfInput || pdfInput.files.length === 0) {
// //         callback(doc);
// //         return;
// //     }

// //     let fileIndex = 0;

// //     function processNextFile() {
// //         if (fileIndex >= pdfInput.files.length) {
// //             callback(doc);
// //             return;
// //         }

// //         let file = pdfInput.files[fileIndex];
// //         let reader = new FileReader();

// //         reader.onload = function (event) {
// //             let pdfData = new Uint8Array(event.target.result);
// //             pdfjsLib.getDocument({ data: pdfData }).promise.then(pdfDoc => {
// //                 let totalPages = pdfDoc.numPages;

// //                 function addPage(pageNumber) {
// //                     if (pageNumber > totalPages) {
// //                         fileIndex++;
// //                         processNextFile();
// //                         return;
// //                     }

// //                     pdfDoc.getPage(pageNumber).then(page => {
// //                         let viewport = page.getViewport({ scale: 1.0 });
// //                         let canvas = document.createElement("canvas");
// //                         let context = canvas.getContext("2d");

// //                         canvas.width = viewport.width;
// //                         canvas.height = viewport.height;

// //                         page.render({ canvasContext: context, viewport }).promise.then(() => {
// //                             let imgData = canvas.toDataURL("image/png");
// //                             doc.addPage();
// //                             doc.addImage(imgData, "PNG", 10, 10, 190, 280);
// //                             addPage(pageNumber + 1);
// //                         });
// //                     });
// //                 }

// //                 addPage(1);
// //             });
// //         };

// //         reader.readAsArrayBuffer(file);
// //     }

// //     processNextFile();
// // }





// // function addHeader(doc, img) {
// //     let logoWidth = 15;
// //     let logoHeight = 15;
// //     let headerMarginTop = 8;
// //     let textX = 210 - 75;
// //     let logoY = headerMarginTop;

// //     doc.addImage(img, "PNG", 10, logoY, logoWidth, logoHeight);
// //     doc.setFont("helvetica");
// //     doc.setFontSize(12);
// //     doc.setTextColor(255, 255, 255);
// //     doc.text("www.explormee.com", textX, logoY + 8);
// // }

// // function addPageNumber(doc, pageNumber) {
// //     doc.setFont("helvetica", "normal");
// //     doc.setFontSize(12);
// //     doc.setTextColor(255, 255, 255);
// //     doc.text(`Page ${pageNumber}`, 100, 290);
// // }

// // function downloadPDF() {
// //     generatePDF(doc => {
// //         doc.save("Personality-Report.pdf");
// //     });
// // }

// // function viewPDF() {
// //     generatePDF(doc => {
// //         const pdfBlob = doc.output("blob");
// //         const pdfUrl = URL.createObjectURL(pdfBlob);
// //         window.open(pdfUrl, "_blank");
// //     });
// // }





// // testing:- Adding the first page 




// // ------------issue to be fixed :-Adding the first page ---------------


// function generatePDF(callback) {
//     const { jsPDF } = window.jspdf;
//     let doc = new jsPDF({
//         unit: "mm",
//         format: "a4",
//         orientation: "portrait"
//     });

//     let marginLeft = 20;
//     let maxWidth = 170;
//     let lineHeight = 7;
//     let safeMarginBottom = 270;
//     let y;
//     let pageNumber = 1;

//     // let img = new Image();
//     // img.src = "logo.png";
//     // ADDING NEW PAGE HERE 
//     let coverImage = new Image();
//     coverImage.src = "Page1.png";


  

//     // let img = new Image();
//     // img.src = "logo.png";
//     coverImage.onload = function (){
//         doc.addImage(coverImage, "PNG", 0, 0, 210, 297); // add cover page
//         let userName = document.getElementById("user-name").value.trim(); // Get user name
//         if (userName.length > 0){
//             doc.setFont("times", "bold"); // text design for name 
//             doc.setFontSize(60);// user name size 
//             doc.setTextColor(255, 212, 35);// user name color 
//             // doc.text(userName, 28, 230); // Adjusted position
//             //Split name into two lines (max width 160mm)
//             let splitName = doc.splitTextToSize(userName, 160);
//             // Set initial position
//             let nameY = 245; // Adjusted for better placement
//             splitName.forEach(line =>{
//                 doc.text(line, 32, nameY); // Adjusted position
//                 nameY += 20; // Line spacing

//             });


            




//         }
//         addPageNumber(doc, pageNumber);
//         pageNumber++;

        

        



     

//     }
   
//     let img = new Image();
//     img.src = "logo.png"; 

   

//     img.onload = function () {
//         const sections = [
//             { title: "Analysis of Strength, Weakness and Behavioural Patterns", topics: ["Strengths", "Weakness", "Behavioural Patterns"] },
//             { title: "Analysis of Luck & Fame, Monetary Aspects, Abroad Settlement", topics: ["Luck & Fame", "Monetary Aspects", "Abroad Settlement"] },
//             { title: "Analysis of Mental and Physical Health", topics: ["Mental Health", "Physical Health"] },
//             { title: "Analysis of Job & Business Opportunities and Government Job Possibilities", topics: ["Job Opportunities", "Business Opportunities", "Possibilities of Govt Job"] }
//         ];

//         doc.setFillColor(0, 0, 0);
//         doc.setFont("times", "normal");
//         doc.setFontSize(20); // Explicitly set default content font size

//         sections.forEach((section, index) => {
//             doc.addPage();
//             doc.rect(0, 0, 210, 297, "F"); 
//             addHeader(doc, img);

//             doc.setFont("times", "bold");
//             doc.setFontSize(22);
//             doc.setTextColor(255, 212, 35);
//             let titleText = doc.splitTextToSize(section.title, maxWidth);
//             let titleHeight = titleText.length * 10;
//             let titleY = (297 - titleHeight) / 2;

//             titleText.forEach(line => {
//                 let textWidth = doc.getTextWidth(line);
//                 doc.text(line, (210 - textWidth) / 2, titleY);
//                 titleY += 10;
//             });

//             addPageNumber(doc, pageNumber);
//             pageNumber++;

//             y = 50;

//             doc.addPage();
//             doc.rect(0, 0, 210, 297, "F");
//             addHeader(doc, img);

//             let hasContent = false;

//             section.topics.forEach(title => {
//                 let text = document.getElementById(title.replace(/ /g, '-')).value.trim();
//                 if (text.length === 0) return;
//                 hasContent = true;

//                 if (y + 15 > safeMarginBottom) {
//                     addPageNumber(doc, pageNumber);
//                     pageNumber++;
//                     doc.addPage();
//                     doc.rect(0, 0, 210, 297, "F");
//                     addHeader(doc, img);
//                     y = 50;
//                 }

//                 doc.setFont("times", "bold");
//                 doc.setFontSize(22);
//                 doc.setTextColor(255, 212, 35);
//                 let topicWidth = doc.getTextWidth(title);
//                 doc.text(title, (210 - topicWidth) / 2, y);
//                 y += 13;

//                 doc.setFont("times", "normal");
//                 doc.setFontSize(16);
//                 doc.setTextColor(255, 255, 255);
                
//                 let splitText = doc.splitTextToSize(text, maxWidth);
//                 splitText.forEach(line => {
//                     if (y + lineHeight > safeMarginBottom) {
//                         addPageNumber(doc, pageNumber);
//                         pageNumber++;
//                         doc.addPage();
//                         doc.rect(0, 0, 210, 297, "F");
//                         addHeader(doc, img);
//                         doc.setFontSize(16); // Ensure consistent font size for dynamically created pages
//                         y = 50;
//                     }
//                     doc.text(line, marginLeft, y);
//                     y += lineHeight;
//                 });

//                 y += 15;
//             });

//             if (!hasContent) {
//                 y = 50;
//             }

//             addPageNumber(doc, pageNumber);
//             pageNumber++;
//         });
       
//         // 🟢 Add "Signature Correction" Page
// doc.addPage();
// doc.rect(0, 0, 210, 297, "F"); 
// addHeader(doc, img);

// doc.setFont("times", "bold");
// doc.setFontSize(20);
// doc.setTextColor(255, 212, 35);
// let sigTitle = "Signature Correction";
// let sigTextWidth = doc.getTextWidth(sigTitle);
// doc.text(sigTitle, (210 - sigTextWidth) / 2, 50);

// // 🟢 Load and insert user-uploaded signature image
// let signatureInput = document.getElementById("signature-upload");
// if (signatureInput && signatureInput.files.length > 0) {
//     let file = signatureInput.files[0];
//     let reader = new FileReader();

//     reader.onload = function (event) {
//         let signatureImg = new Image();
//         signatureImg.src = event.target.result;

//         signatureImg.onload = function () {
//             doc.addImage(signatureImg, "PNG", 50, 65, 100, 40); // Adjusted position
//             addSignatureHelpSection();
//         };
//     };
//     reader.readAsDataURL(file);
// } else {
//     addSignatureHelpSection();
// }

// // 🟢 Add "How will this signature help" heading after the image
// function addSignatureHelpSection() {
//     let yPos = 140; // Adjusted position below image

//     doc.setFont("times", "bold");
//     doc.setFontSize(20);
//     doc.setTextColor(255, 212, 35);
//     let helpTitle = "How will this signature help";
//     let helpTextWidth = doc.getTextWidth(helpTitle);
//     doc.text(helpTitle, (210 - helpTextWidth) / 2, yPos);
//     yPos += 10;

//     let sigText = document.getElementById("Signature-Correction").value.trim();
//     doc.setFont("times", "normal");
//     doc.setFontSize(16);
//     doc.setTextColor(255, 255, 255);
//     let splitSigText = doc.splitTextToSize(sigText, maxWidth);

//     splitSigText.forEach(line => {
//         if (yPos + lineHeight > safeMarginBottom) {
//             addPageNumber(doc, pageNumber);
//             pageNumber++;
//             doc.addPage();
//             doc.rect(0, 0, 210, 297, "F");
//             addHeader(doc, img);
//             doc.setFontSize(16);
//             yPos = 50;
//         }
//         doc.text(line, marginLeft, yPos);
//         yPos += lineHeight;
//     });

//     addPageNumber(doc, pageNumber);
//     pageNumber++;
//     appendUploadedPDFs(doc, callback);

   
// }

        
//     };// end of image.onload function

// } // end of generate pdf function. 

// //Content down below are not a part of make pdf function 
// // 🟢 Function to append uploaded PDFs at the end
// function appendUploadedPDFs(doc, callback) {
//     let pdfInput = document.getElementById("pdf-upload");
//     if (!pdfInput || pdfInput.files.length === 0) {
//         callback(doc);
//         return;
//     }

//     let fileIndex = 0;

//     function processNextFile() {
//         if (fileIndex >= pdfInput.files.length) {
//             callback(doc);
//             return;
//         }

//         let file = pdfInput.files[fileIndex];
//         let reader = new FileReader();

//         reader.onload = function (event) {
//             let pdfData = new Uint8Array(event.target.result);
//             pdfjsLib.getDocument({ data: pdfData }).promise.then(pdfDoc => {
//                 let totalPages = pdfDoc.numPages;

//                 function addPage(pageNumber) {
//                     if (pageNumber > totalPages) {
//                         fileIndex++;
//                         processNextFile();
//                         return;
//                     }

//                     pdfDoc.getPage(pageNumber).then(page => {
//                         let viewport = page.getViewport({ scale: 1.0 });
//                         let canvas = document.createElement("canvas");
//                         let context = canvas.getContext("2d");

//                         canvas.width = viewport.width;
//                         canvas.height = viewport.height;

//                         page.render({ canvasContext: context, viewport }).promise.then(() => {
//                             let imgData = canvas.toDataURL("image/png");
//                             doc.addPage();
//                             doc.addImage(imgData, "PNG", 10, 10, 190, 280);
//                             addPage(pageNumber + 1);
//                         });
//                     });
//                 }

//                 addPage(1);
//             });
//         };

//         reader.readAsArrayBuffer(file);
//     }

//     processNextFile();
// }





// function addHeader(doc, img) {
//     let logoWidth = 15;
//     let logoHeight = 15;
//     let headerMarginTop = 8;
//     let textX = 210 - 75;
//     let logoY = headerMarginTop;

//     doc.addImage(img, "PNG", 10, logoY, logoWidth, logoHeight);
//     doc.setFont("times");
//     doc.setFontSize(12);
//     doc.setTextColor(255, 255, 255);
//     doc.text("www.explormee.com", textX, logoY + 8);
// }

// function addPageNumber(doc, pageNumber) {
//     doc.setFont("times", "normal");
//     doc.setFontSize(12);
//     doc.setTextColor(255, 255, 255);
//     doc.text(`Page ${pageNumber}`, 100, 290);
// }

// function downloadPDF() {
//     generatePDF(doc => {
//         doc.save("Personality-Report.pdf");
//     });
// }

// function viewPDF() {
//     generatePDF(doc => {
//         const pdfBlob = doc.output("blob");
//         const pdfUrl = URL.createObjectURL(pdfBlob);
//         window.open(pdfUrl, "_blank");
//     });
// }


//------------------testing here adding first page------------------



function generatePDF(callback) {
    const { jsPDF } = window.jspdf;
    let doc = new jsPDF({
        unit: "mm",
        format: "a4",
        orientation: "portrait"
    });

    let marginLeft = 20;
    let maxWidth = 170;
    let lineHeight = 7;
    let safeMarginBottom = 270;
    let y;
    let pageNumber = 1;

    // let img = new Image();
    // img.src = "logo.png";
    
    let coverImage = new Image();
    coverImage.src = "Page1.png";
    


  

    // let img = new Image();
    // img.src = "logo.png";
    
    coverImage.onload = function (){
        doc.addImage(coverImage, "PNG", 0, 0, 210, 297); // add cover page
        let userName = document.getElementById("user-name").value.trim(); // Get user name
        if (userName.length > 0){
            doc.setFont("times", "bold"); // text design for name 
            doc.setFontSize(60);// user name size 
            doc.setTextColor(255, 212, 35);// user name color 
            // doc.text(userName, 28, 230); // Adjusted position
            //Split name into two lines (max width 160mm)
            // let splitName = doc.splitTextToSize(userName, 160);
            // // Set initial position
            // let nameY = 245; // Adjusted for better placement
            // splitName.forEach(line =>{
            //     doc.text(line, 32, nameY); // Adjusted position
            //     nameY += 20; // Line spacing

            // });

            let splitName = doc.splitTextToSize(userName, 160);

            if (splitName.length > 1) {
                let nameY = 245;
                doc.text(splitName[0], 32, nameY - 20); // Move the first line up
                doc.text(splitName[1], 32, nameY); // Second line stays at the original position
            } else {
                doc.text(splitName[0], 32, 245); // If only one line, keep it at default position
            }
            

        }
        addPageNumber(doc, pageNumber);
        pageNumber++;
    

    }
   
    

    let img = new Image();
    img.src = "logo.png"; 


    img.onload = function () {
        const sections = [
            { title: "Analysis of Strength, Weakness and Behavioural Patterns", topics: ["Strengths", "Weakness", "Behavioural Patterns"] },
            { title: "Analysis of Luck & Fame, Monetary Aspects, Abroad Settlement", topics: ["Luck & Fame", "Monetary Aspects", "Abroad Settlement"] },
            { title: "Analysis of Mental and Physical Health", topics: ["Mental Health", "Physical Health"] },
            { title: "Analysis of Job & Business Opportunities and Government Job Possibilities", topics: ["Job Opportunities", "Business Opportunities", "Possibilities of Govt Job"] }
        ];

        doc.setFillColor(0, 0, 0);
        doc.setFont("times", "normal");
        doc.setFontSize(20); // Explicitly set default content font size

        sections.forEach((section, index) => {
            doc.addPage();
            doc.rect(0, 0, 210, 297, "F"); 
            addHeader(doc, img);

            doc.setFont("times", "bold");
            doc.setFontSize(24);
            doc.setTextColor(255, 212, 35);
            let titleText = doc.splitTextToSize(section.title, maxWidth);
            let titleHeight = titleText.length * 10;
            let titleY = (297 - titleHeight) / 2;

            titleText.forEach(line => {
                let textWidth = doc.getTextWidth(line);
                doc.text(line, (210 - textWidth) / 2, titleY);
                titleY += 10;
            });

            addPageNumber(doc, pageNumber);
            pageNumber++;

            y = 50;

            doc.addPage();
            doc.rect(0, 0, 210, 297, "F");
            addHeader(doc, img);

            let hasContent = false;

            section.topics.forEach(title => {
                let text = document.getElementById(title.replace(/ /g, '-')).value.trim();
                if (text.length === 0) return;
                hasContent = true;

                if (y + 15 > safeMarginBottom) {
                    addPageNumber(doc, pageNumber);
                    pageNumber++;
                    doc.addPage();
                    doc.rect(0, 0, 210, 297, "F");
                    addHeader(doc, img);
                    y = 50;
                }

                doc.setFont("times", "bold");
                doc.setFontSize(24);
                doc.setTextColor(255, 212, 35);
                let topicWidth = doc.getTextWidth(title);
                doc.text(title, (210 - topicWidth) / 2, y);
                y += 13;

                doc.setFont("times", "normal");
                doc.setFontSize(20);
                doc.setTextColor(255, 255, 255);
                
                let splitText = doc.splitTextToSize(text, maxWidth);
                splitText.forEach(line => {
                    if (y + lineHeight > safeMarginBottom) {
                        addPageNumber(doc, pageNumber);
                        pageNumber++;
                        doc.addPage();
                        doc.rect(0, 0, 210, 297, "F");
                        addHeader(doc, img);
                        doc.setFontSize(20); // Ensure consistent font size for dynamically created pages
                        y = 50;
                    }
                    doc.text(line, marginLeft, y);
                    y += lineHeight;
                });

                y += 15;
            });

            if (!hasContent) {
                y = 50;
            }

            addPageNumber(doc, pageNumber);
            pageNumber++;
        });
       
        // 🟢 Add "Signature Correction" Page
doc.addPage();
doc.rect(0, 0, 210, 297, "F"); 
addHeader(doc, img);

doc.setFont("times", "bold");
doc.setFontSize(24);
doc.setTextColor(255, 212, 35);
let sigTitle = "Signature Correction";
let sigTextWidth = doc.getTextWidth(sigTitle);
doc.text(sigTitle, (210 - sigTextWidth) / 2, 50);

// 🟢 Load and insert user-uploaded signature image
let signatureInput = document.getElementById("signature-upload");
if (signatureInput && signatureInput.files.length > 0) {
    let file = signatureInput.files[0];
    let reader = new FileReader();

    reader.onload = function (event) {
        let signatureImg = new Image();
        signatureImg.src = event.target.result;

        signatureImg.onload = function () {
            doc.addImage(signatureImg, "PNG", 50, 65, 100, 40); // Adjusted position
            addSignatureHelpSection();
        };
    };
    reader.readAsDataURL(file);
} else {
    addSignatureHelpSection();
}

// 🟢 Add "How will this signature help" heading after the image
function addSignatureHelpSection() {
    let yPos = 140; // Adjusted position below image

    doc.setFont("times", "bold");
    doc.setFontSize(22);
    doc.setTextColor(255, 212, 35);
    let helpTitle = "How will this signature help";
    let helpTextWidth = doc.getTextWidth(helpTitle);
    doc.text(helpTitle, (210 - helpTextWidth) / 2, yPos);
    yPos += 10;

    let sigText = document.getElementById("Signature-Correction").value.trim();
    doc.setFont("times", "normal");
    doc.setFontSize(20);
    doc.setTextColor(255, 255, 255);
    let splitSigText = doc.splitTextToSize(sigText, maxWidth);

    splitSigText.forEach(line => {
        if (yPos + lineHeight > safeMarginBottom) {
            addPageNumber(doc, pageNumber);
            pageNumber++;
            doc.addPage();
            doc.rect(0, 0, 210, 297, "F");
            addHeader(doc, img);
            doc.setFontSize(20);
            yPos = 50;
        }
        doc.text(line, marginLeft, yPos);
        yPos += lineHeight;
    });

    addPageNumber(doc, pageNumber);
    pageNumber++;
    // appendUploadedPDFs(doc, callback);

   
}

        
    };// end of image.onload function
    appendUploadedPDFs(doc, callback);
} // end of generate pdf function. 

//Content down below are not a part of make pdf function 
// 🟢 Function to append uploaded PDFs at the end
function appendUploadedPDFs(doc, callback) {
    let pdfInput = document.getElementById("pdf-upload");
    if (!pdfInput || pdfInput.files.length === 0) {
        callback(doc);
        return;
    }

    let fileIndex = 0;

    function processNextFile() {
        if (fileIndex >= pdfInput.files.length) {
            callback(doc);
            return;
        }

        let file = pdfInput.files[fileIndex];
        let reader = new FileReader();

        reader.onload = function (event) {
            let pdfData = new Uint8Array(event.target.result);
            pdfjsLib.getDocument({ data: pdfData }).promise.then(pdfDoc => {
                let totalPages = pdfDoc.numPages;

                function addPage(pageNumber) {
                    if (pageNumber > totalPages) {
                        fileIndex++;
                        processNextFile();
                        return;
                    }

                    pdfDoc.getPage(pageNumber).then(page => {
                        let viewport = page.getViewport({ scale: 1.0 });
                        let canvas = document.createElement("canvas");
                        let context = canvas.getContext("2d");

                        canvas.width = viewport.width;
                        canvas.height = viewport.height;

                        page.render({ canvasContext: context, viewport }).promise.then(() => {
                            let imgData = canvas.toDataURL("image/png");
                            doc.addPage();
                            // doc.addImage(imgData, "PNG", 10, 10, 190, 280);
                            doc.addImage(imgData, "JPEG", 10, 10, 190, 280, '', 'FAST');
                            addPage(pageNumber + 1);
                        });
                    });
                }

                addPage(1);
            });
        };

        reader.readAsArrayBuffer(file);
    }

    processNextFile();
}





function addHeader(doc, img) {
    let logoWidth = 18;
    let logoHeight = 18;
    let headerMarginTop = 8;
    let textX = 210 - 75;
    let logoY = headerMarginTop;

    doc.addImage(img, "PNG", 10, logoY, logoWidth, logoHeight);
    doc.setFont("times");
    doc.setFontSize(16);
    doc.setTextColor(255, 255, 255);
    let adjustedTextX = textX + 20;
    doc.text("www.explormee.com", adjustedTextX, logoY + 8);
}

function addPageNumber(doc, pageNumber) {
    doc.setFont("times", "normal");
    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255);
    doc.text(`Page ${pageNumber}`, 100, 290);
}

function downloadPDF() {
    generatePDF(doc => {
        // doc.save("Personality-Report.pdf");
        let userName = document.getElementById("user-name").value.trim(); // Get user name
        let fileName = userName ? `${userName}-Personality-Report.pdf` : "Personality-Report.pdf"; // Fallback name
        // doc.save(fileName);
        doc.save(fileName, { compress: true });


        
    });
}

function viewPDF() {
    generatePDF(doc => {
        const pdfBlob = doc.output("blob");
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl, "_blank");
    });
}











