export const toFormData = (blobs: Blob[]): FormData => {
    const formData = new FormData();
    blobs.forEach((blob, index) => {
        formData.append(`file${index}`, blob);
    })

    return formData;
}