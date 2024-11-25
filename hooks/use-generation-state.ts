// import { LSConsts } from "@/const/consts";
// import { GenerationState } from "@/types/generation-state";
// import { openDB } from 'idb';

// export const getGenerationIndexedDB = async () => {
//     return await openDB('ib-pending-generations', 1, {
//         upgrade(db) {
//             db.createObjectStore('images');
//         }
//     });
// }

// export const useGenerationState = async () => {
//     const db = await getGenerationIndexedDB();
    
//     const savePendingGenerations = async ( state: GenerationState, images: Blob[] ) => {
//         const pending = JSON.parse(localStorage.getItem(LSConsts.PENDING_GENERATIONS) || '[]');
//         localStorage.setItem(LSConsts.PENDING_GENERATIONS, JSON.stringify([...pending, state ]));

//         // TODO: save images to indexDB 
//         if (images) {
//             await Promise.all(
//                 images.map(async (image, index) => {
//                     await db.put('images', image, state.id + '-' + index);
//                 })
//             )
//         }
//     }

//     const removePendingGeneration = async ( id: string ) => {
//         const pending = JSON.parse(localStorage.getItem(LSConsts.PENDING_GENERATIONS) || '[]');
//         localStorage.setItem(LSConsts.PENDING_GENERATIONS, JSON.stringify(pending.filter((gen: GenerationState) => gen.id !== id)));

//         // TODO: remove images from indexDB
//         const keys = await db.getAllKeys('images');
//         await Promise.all(
//             keys.filter(key => key.toString().startsWith(id)).map(key => db.delete('images', key))
//         )
//     }

//     return { savePendingGenerations, removePendingGeneration };
// }