$(".recordCheckBox").click(async (obj) =>{

  const delay = 150;//ms

  const id = obj.delegateTarget.id;
  $.post("/deleteRecord",
  {
    id: id,
  },
  function(data, status){
  });

  setTimeout(()=> {
    location.reload()
  }
 ,delay);
  
})