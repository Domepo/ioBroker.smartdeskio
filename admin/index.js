"use strict";



var count = 0;

window.addEventListener("load",function(){

    var can_frontend_io = document.createElement("div");
    // value attr for save
    

    document.querySelector(".col.s6.input-field").appendChild(can_frontend_io);



    function create_radio_box(){

        
        var create_dropdown_for_recieve_send    = document.createElement("div"), 
            create_dropdown_selection           = document.createElement("select"),   
            dropdown_recieve_option             = document.createElement("option"),
            dropdown_send_option                = document.createElement("option"),
            dropdown_label                      = document.createElement("label");

            create_dropdown_for_recieve_send.setAttribute("class","input-field col s12");

            create_dropdown_selection.setAttribute("id","recieve_or_send");
            create_dropdown_selection.setAttribute("class","value");

            dropdown_recieve_option.setAttribute("value","rc");

            dropdown_send_option.setAttribute("value","sn");

            dropdown_label.setAttribute("class","translate");
            dropdown_label.setAttribute("for","recieve_or_send")


            can_frontend_io.appendChild(create_dropdown_for_recieve_send); 
            create_dropdown_for_recieve_send.appendChild(create_dropdown_selection);
            create_dropdown_selection.appendChild(dropdown_recieve_option); 
            create_dropdown_selection.appendChild(dropdown_send_option);
            create_dropdown_selection.appendChild(dropdown_label);


        dropdown_recieve_option.innerHTML = "Recieve";
        dropdown_send_option.innerHTML    = "Send";
    }
    //get input data
    function get_radio_data(callback){

        var rcsn_listener = document.getElementById("recieve_or_send");



        rcsn_listener.addEventListener("change",  ()=>  {

            if (document.getElementById("recieve_or_send").value == "rc") {

              //reactivate radio button
               // document.getElementById("radio-recieve-button-id").disabled = false;

                // provide infinte Loop
                const removeClass = (elms) => elms.forEach(el => el.remove());
                removeClass(document.querySelectorAll(".master-id-class") );
                removeClass(document.querySelectorAll(".filter_div_style") );
                removeClass(document.querySelectorAll(".more_class") );

                callback();
                // Disable a repeat button press

            }
            if (document.getElementById("recieve_or_send").value == "sn") {
  
                // if ( document.getElementById("master-id-id") != null)   {
                // document.getElementById("master-id-id").style.display = "none";

                // }
                const removeClass = (elms) => elms.forEach(el => el.remove());
                removeClass(document.querySelectorAll(".master-id-class") );
                removeClass(document.querySelectorAll(".filter_div_style") );
                removeClass(document.querySelectorAll(".more_class") );
                console.log("SEND");
            }
        
        });
    }
    function create_id_name_master_field(counter){

        if(counter == undefined){
            counter = 0;
        }


        
        var field_for_id_and_master = document.createElement("div"),
            master_id_field         = document.createElement("input"),
            master_name_field       = document.createElement("input"),
            label_for_id_field      = document.createElement("label"),
            label_for_name_field    = document.createElement("label"),
            n_filter                = document.createElement("input"),
            label_for_n_filter      = document.createElement("label"),
            ready_button            = document.createElement("button"),
            bracket                 = document.createElement("br");

        
        field_for_id_and_master.setAttribute("class","master-id-class");    
        field_for_id_and_master.setAttribute("id","master-id-id"+counter);   
        
        label_for_id_field.setAttribute("for","master_id_field"+counter);
        label_for_name_field.setAttribute("for","master_name_field"+counter);

        master_name_field.setAttribute("id","master-name-field"+counter);
        master_id_field.setAttribute("id","master-id-field"+counter);

        master_id_field.setAttribute("class","value");

        n_filter.setAttribute("type","number");
        n_filter.setAttribute("class","n_filter_style")
        n_filter.setAttribute("id","n-filter"+counter);

        label_for_n_filter.setAttribute("for","n_filter");

        ready_button.setAttribute("id","ready-button"+counter);

        can_frontend_io.appendChild(field_for_id_and_master);

        field_for_id_and_master.appendChild(bracket);
        field_for_id_and_master.appendChild(label_for_id_field);
        field_for_id_and_master.appendChild(master_id_field);
        field_for_id_and_master.appendChild(label_for_name_field);
        field_for_id_and_master.appendChild(master_name_field);
        field_for_id_and_master.appendChild(label_for_n_filter);
        field_for_id_and_master.appendChild(n_filter);
        field_for_id_and_master.appendChild(ready_button);


        label_for_name_field.innerHTML  = "Name : ";
        label_for_id_field.innerHTML    = "ID : ";
        label_for_n_filter.innerHTML    = "Wie viele? ";
        ready_button.innerHTML          = "Go";


        // if(document.getElementById(counter+"filter_div_id1")!=null){
        //     console.log(document.getElementById(counter+"filter_div_id1"));
        //     console.log(counter+"filter_div_id1");
        //  }



        ready_button.addEventListener("click",()=>{


            const removeClass = (elms) => elms.forEach(el => el.remove());
            //removeClass(document.querySelectorAll(".filter_div_style") );
            removeClass(document.querySelectorAll(".more_class") );


            var get_n_filter_value = document.getElementById("n-filter"+counter).value;

            for(var i=0;i<get_n_filter_value;i++){
                create_filter_box(get_n_filter_value,i,i,i,counter);
            }
            //if there is more than one object

            var int_get_n_filter_value = parseInt(get_n_filter_value);
            //show "more" only if there is any value
            if(int_get_n_filter_value > 0){
                document.getElementById("ready-button"+counter).disabled = true;  
                console.log(counter);
                    add_obj();
                }
                          
        });

    }

    function add_obj(){

        var add_border                  = document.createElement("div"),
        add_button                      = document.createElement("button");

        add_button.setAttribute("class","more_class");
        add_button.setAttribute("id","more-id");

        can_frontend_io.appendChild(add_button);

        add_button.innerHTML = "More";


        var master_more_button = document.getElementById("more-id");
        master_more_button.addEventListener("click",()=>{

            count++;
    
            create_id_name_master_field(count);
            add_obj(count);

            const removeClass = (elms) => elms.forEach(el => el.remove());
            removeClass(document.querySelectorAll(".more_class") );
        });

    }

    function create_filter_box(value,div_n,name_n,id_n,master_identifier){
        
        if(master_identifier == undefined){
            master_identifier = 0;
        }

        var filter_div                  = document.createElement("div"),
        filter_box_name                 = document.createElement("input"),
        filter_box_id                   = document.createElement("input"),
        label_for_filter_name           = document.createElement("label"),
        label_for_filter_id             = document.createElement("label");

        label_for_filter_id.setAttribute("for",master_identifier+"filter_box_id");
        label_for_filter_name.setAttribute("for",master_identifier+"filter_box_name");

        filter_div.setAttribute("class","filter_div_style");
        filter_div.setAttribute("id",master_identifier+"filter_div_id"+div_n);

        filter_box_name.setAttribute("id",master_identifier+"box_name"+name_n);
        filter_box_id.setAttribute("id",master_identifier+"id_name"+id_n);


        can_frontend_io.appendChild(filter_div);
        filter_div.appendChild(label_for_filter_name);
        filter_div.appendChild(filter_box_name);
        filter_div.appendChild(label_for_filter_id);
        filter_div.appendChild(filter_box_id);

        label_for_filter_id.innerHTML = "Filter";
        label_for_filter_name.innerHTML ="Name";

    }


    create_radio_box();
    get_radio_data(create_id_name_master_field);

}); 