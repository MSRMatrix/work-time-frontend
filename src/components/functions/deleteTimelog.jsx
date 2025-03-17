export async function deleteTimelog(){
    const URL = import.meta.env.VITE_BACKENDURL;
    try{
        const response = await fetch(`${URL}/timelog`,{
            method: "DELETE",
            headers:{
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
        if(!response.ok){
            return alert("Fehler beim Löschen!")
        }else{
            return alert("Arbeitszeiten gelöscht!")
        }
    }catch(error){
        console.log(error);
    }
}