// src/components/ChildList.jsx
import React from 'react';
import { PlusCircle, CheckCircle } from 'lucide-react';

export const AddChildForm = ({ newChild, setNewChild, onSubmit }) => (
 <form onSubmit={onSubmit} className="mb-4">
   <div className="flex gap-2">
     <input
       type="text"
       placeholder="Name"
       className="flex-1 p-2 bg-gray-700 border-gray-600 rounded text-white placeholder-gray-400"
       value={newChild.name}
       onChange={(e) => setNewChild({ ...newChild, name: e.target.value })}
     />
     <input
       type="number"
       placeholder="Allowance"
       className="w-24 p-2 bg-gray-700 border-gray-600 rounded text-white placeholder-gray-400"
       value={newChild.weekly_allowance}
       onChange={(e) => setNewChild({ ...newChild, weekly_allowance: parseFloat(e.target.value) })}
     />
     <button type="submit" className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700">
       <PlusCircle className="h-5 w-5" />
     </button>
   </div>
 </form>
);

export const ChildList = ({ 
 children, 
 assignments, 
 chores, 
 selectedChores, 
 setSelectedChores, 
 onAssignChores, 
 onCompleteChore,
 onDeleteAssignment
}) => (
 <div className="space-y-2">
   {children.map(child => (
     <div key={child.id} className="p-4 bg-gray-700 rounded-lg">
       <div className="flex justify-between items-center mb-4">
         <span className="text-lg text-white font-medium">{child.name}</span>
         <span className="text-green-400">${child.weekly_allowance}</span>
       </div>

       <div className="mb-4">
         <select
           multiple
           className="w-full p-2 bg-gray-600 border-gray-500 rounded text-white mb-2"
           value={selectedChores[child.id] || []}
           onChange={(e) => {
             const selected = Array.from(e.target.selectedOptions, option => parseInt(option.value));
             setSelectedChores({
               ...selectedChores,
               [child.id]: selected
             });
           }}
         >
           {chores.map(chore => (
             <option key={chore.id} value={chore.id}>
               {chore.name} ({chore.frequency_per_week}x/week)
             </option>
           ))}
         </select>
         <button
           onClick={() => onAssignChores(child.id)}
           className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
         >
           Assign Selected Chores
         </button>
       </div>

       <div className="space-y-2">
         {assignments[child.id]?.map(assignment => (
           <div key={assignment.id} className="bg-gray-600 p-3 rounded-lg">
             <div className="flex items-center justify-between">
               <div>
                 <span className="text-white">
                   {assignment.chore.name}
                   <span className="text-xs text-gray-400 ml-2">
                     (#{assignment.occurrence_number} of {assignment.chore.frequency_per_week})
                   </span>
                 </span>
               </div>
               <div className="flex space-x-2">
                 {!assignment.is_completed && (
                   <>
                     <button
                       onClick={() => onCompleteChore(assignment.id)}
                       className="text-blue-400 hover:text-blue-300"
                     >
                       Complete
                     </button>
                     <button
                       onClick={() => onDeleteAssignment(assignment.id, child.id)}
                       className="text-red-400 hover:text-red-300"
                     >
                       Delete
                     </button>
                   </>
                 )}
                 {assignment.is_completed && (
                   <span className="text-green-400">
                     <CheckCircle className="h-5 w-5 inline mr-1" />
                     Completed {new Date(assignment.completion_date).toLocaleDateString()}
                   </span>
                 )}
               </div>
             </div>
           </div>
         ))}
       </div>
     </div>
   ))}
 </div>
);