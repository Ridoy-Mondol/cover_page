export const handlePreview = (id, img_src) => { 

    const width = 794;
    const height = 1121;
    const left = (window.innerWidth / 2) - (width / 2);
    const top = (window.innerHeight / 2) - (height / 2);

    const newWindow = window.open("", "_blank", `width=${width},height=${height},top=${top},left=${left}`);

    newWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Cover Page Preview</title>
        <!-- Tailwind CSS for styling -->
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: auto;
            margin: 0;
            padding: 0;
            background-color: #f0f0f0;
            font-family: sans-serif;
          }
          img {
            width: 794px;
            height: auto; 
            max-height: 100%;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
        </style>
      </head>
      <body>
        <img src="${img_src}" alt="Cover Page">       
      </body>
      </html>
    `);
    newWindow.document.close();
  };
  
