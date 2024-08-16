import{_ as f,a as s,b as o,u as d,j as g,c as v,m as h,g as p,t as y,h as x,e as b,f as i,w as _,l as B,d as u,k as m}from"./index-dlVRCVJv.js";import{_ as w}from"./VehicleDetails-Ds6fqLv3.js";const V={},k={class:"absolute text-lg font-Montserrat font-bold tracking-wide flex justify-center items-center text-center w-full h-12 rounded-t-md top-0 bg-charcoalGray text-goldenYellow-default"};function $(e,t){return s(),o("div",k," Premium Delivery ")}const C=f(V,[["render",$]]),P={class:"text-center my-4"},N={class:"font-Montserrat font-bold text-lg"},j={__name:"VehiclePrice",props:{price:{type:Number,required:!0},calculate:{type:Boolean,default:!1}},setup(e){const t=e,a=d(),r=g(a.getters["bookings/numberOfDays"]),c=v(()=>t.calculate?(t.price*r.value).toFixed(2):t.price.toFixed(2));return(l,n)=>(s(),o("p",P,[h(" Total Price: "),p("span",N," $ "+y(c.value),1)]))}},D={__name:"VehicleButton",props:{vehicle:{type:Object,required:!0}},setup(e){const t=d(),a=x(),r=c=>{t.commit("bookings/setVehicleId",c),a.push("/booking/choose-extras")};return(c,l)=>{const n=b("BaseButton");return s(),o("form",{onSubmit:l[0]||(l[0]=B(q=>r(e.vehicle._id),["prevent"])),class:"flex justify-center"},[i(n,null,{default:_(()=>[h("Choose Now")]),_:1})],32)}}},O={class:"relative bg-white max-w-sm drop-shadow-md rounded-md pt-14 pb-8"},T={__name:"VehicleCard",props:{vehicle:{type:Object,required:!0},calculatePrice:{type:Boolean,default:!1},showVehicleButtton:{type:Boolean,default:!1}},setup(e){return(t,a)=>(s(),o("div",O,[e.vehicle.premiumDelivery?(s(),u(C,{key:0})):m("",!0),i(w,{image:e.vehicle.image,name:e.vehicle.name,category:e.vehicle.category,passengers:e.vehicle.details.passengers,"big-case":e.vehicle.details.storage.bigCase,"small-case":e.vehicle.details.storage.smallCase,transmission:e.vehicle.details.transmission,fuel:e.vehicle.details.fuel,class:"px-8"},null,8,["image","name","category","passengers","big-case","small-case","transmission","fuel"]),i(j,{price:e.vehicle.price,calculate:e.calculatePrice},null,8,["price","calculate"]),e.showVehicleButtton?(s(),u(D,{key:1,vehicle:e.vehicle},null,8,["vehicle"])):m("",!0)]))}};export{T as _};
