
import formidable from "formidable";
import { db } from "../../utils/db";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const uploadDir = path.join(process.cwd(), "/public/schoolImages");

  const parseForm = (req) =>
    new Promise((resolve, reject) => {
      const form = formidable({
        multiples: false,
        uploadDir,
        keepExtensions: true,
      });

      form.parse(req, async (err, fields, files) => {
        if (err) return reject(err);
        let imageFilename = null;

         const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;

          if (imageFile && (imageFile.originalFilename || imageFile.name)) {
          const oldPath = imageFile.filepath || imageFile.path;
          const originalName =
            imageFile.originalFilename || imageFile.name;
          
          const newFilename = Date.now() + "-" + originalName.replace(/\s/g, "_");
          const newPath = path.join(uploadDir, newFilename);
        
          try {
            await fs.promises.rename(oldPath, newPath);
            imageFilename = newFilename;
          } catch (renameErr) {
            return reject(renameErr);
          }
        }
      else{
        console.warn("No image uploaded or filename missing");
      }
        resolve({ fields, imageFilename });
      });
    });

  try {
    const { fields,imageFilename } = await parseForm(req);

    const { name, address, city, state, contact, email_id } = fields;

    await db.query(
      "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?,?,?,?,?,?,?)",
      [name, address, city, state, contact, imageFilename, email_id]
    );

    return res.status(200).json({ message: "School added successfully!" });
  } catch (error) {
    console.error("Error adding school:", error.message);
    return res.status(500).json({ error: error.message });
  }
}
