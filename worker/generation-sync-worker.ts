// import { getGenerationIndexedDB } from "@/hooks/use-generation-state";
// import { getPendingGenerations } from "@/lib/generate";
// import { toFormData } from "@/lib/images";
// import { uploadImageAndUpdateGeneration } from "@/server/actions/generations";

// self.addEventListener('sync', (event: SyncEvent) => {
//     if (event.tag === '') {
//         event.waitUntil(syncPendingGenerations());
//     }
// })

// const syncPendingGenerations = async () => {
//     const pendingGenerations = getPendingGenerations();
//     const db = await getGenerationIndexedDB();

//     for (const gen of pendingGenerations) {
//         try {
//             const genId = gen.id;
//             const keys = await db.getAllKeys('images');
//             const imageBlobs = await Promise.all(
//                 keys.filter(key => key.toString().startsWith(genId))
//                     .map(key => db.get('images', key))
//             );

//             await uploadImageAndUpdateGeneration(genId, toFormData(imageBlobs));
//         } catch (error) {
//             // TODO: handle error
//         }
//     }
// }
