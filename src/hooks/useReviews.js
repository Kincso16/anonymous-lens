import { useQuery, useMutation, useQueryClient, QueryClient } from "@tanstack/react-query"
//import { getAllToDoItems, addToDoItem, deleteToDoItem, updateToDoItem, getToDoById } from "../api/reviewApi"
import{getSubjectsByGrade, getTeachersBySubject, saveReview, getSubjectsByTeacher, getReviewsBySubject,getAllReviews,getReviewStats,setFormAvailability} from "../api/reviewApi"


export const useReviews = () => {
    const client = useQueryClient();
    const {
        data: todos,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['todos'],
        queryFn: getAllToDoItems,
    })

    const {
        data: todos,
        isLoading,
        isError,
        error,
    }=useQuery({
        queryKey:['todos',todoId],
        queryFn: ()=>getToDoById(todoId),
    })

    const { mutate: addToDo, isPedding: isAdding } = useMutation({
        mutationFn: addToDoItem,
        onSuccess: () => {
            QueryClient.invalidateQueries({
                queryKey: ['todos']
            })
        }
    })

    const { mutate: deleteToDo, isPedding: isDeleting } = useMutation({
        mutationFn: deleteToDoItem,
        onSuccess: () => {
            QueryClient.invalidateQueries({
                queryKey: ['todos']
            })
        }
    })

    const { mutate: updateToDo, isPedding: isUpdating } = useMutation({
        mutationFn: updateToDoItem,
        onSuccess: (data, variables) => {
            QueryClient.invalidateQueries({
                queryKey: ['todos']
            });
            QueryClient.invalidateQueries({
                queryKey: ['todos', variables.id]
            })
        }
    })



    return {
        todos,
        isLoading,
        isError,
        error,
        addToDo,
        isAdding,
        deleteToDo,
        isDeleting,
        updateToDo,
        isUpdating,
    }
}
//usemutation mikor hozzaadunk kitorlunk vagy update 
//ha get kerest adunk akkor useclientquery
//`` interpolalt stringekhez... ${id}
//componenseket NAGYBETUKKEL
//pl function ToDoItemCaard
//de a tobbit kis betuvel pl const toDoItemCard
//ami nem valtozik soha azt nagy betukkel vegig pl VEGIG_NAGY


///getSubjectsByGrade, getTeachersBySubject, saveReview, getSubjectsByTeacher, getReviewsBySubject,getAllReviews,getReviewStats

//setFormAvailability