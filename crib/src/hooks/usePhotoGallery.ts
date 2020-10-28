import { useState } from "react";
import { useCamera } from '@ionic/react-hooks/camera';
import { CameraResultType, CameraSource, CameraPhoto } from "@capacitor/core";

export function usePhotoGallery() {

    const { getPhoto } = useCamera();
    const [photos, setPhotos] = useState<Photo[]>([]);

    const readAsBase64 = async (cameraPhoto: CameraPhoto) => {
        // Fetch the photo, read as a blob, then convert to base64 format
        const response = await fetch(cameraPhoto.webPath!);
        return await response.blob();
      }

    const takePhoto = async () => {
        const cameraPhoto = await getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 100,
        });
        const cameraBlob = await readAsBase64(cameraPhoto);
        const fileName = new Date().getTime() + '.jpeg';
        const newPhotos = [{
            filepath: fileName,
            webviewPath: cameraPhoto.webPath,
            blob: cameraBlob
        }, ...photos];
        setPhotos(newPhotos)
    };

    return {
        photos,
        takePhoto
    };
}

export interface Photo {
    filepath: string;
    webviewPath?: string;
    base64?: string;
    blob: Blob;
}