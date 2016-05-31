var IR_BeforeHooks = {
    Isreload:function(pause){
        location.reload();
    }
};
// Router.onBeforeAction(IR_BeforeHooks.Isreload, {
//     except: [
//         'musicdetail'  
//     ]
//   //except: ['admin','categories','login','register','projectlist','search','project','tage'] 
// });