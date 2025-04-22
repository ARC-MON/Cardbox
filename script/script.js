$(document).ready(function(location){

  var amain=0,aside=0,acomp=0;

  var timer;

  //Starting on Maindeck
  $.fn.starttable = function()
  {
    $("#MainButton").addClass("active");
    $("#Main").css("display","block");
  }
  //initializing starting on Maindeck
  $(this).starttable();

  //Card on hover
  $(document).on("mousemove","img.cardssearch,img.question",function(location){
    var photo = $(this).attr("src");
    $("#Photo").attr("src",photo).show();
    $("#Info").css("top",location.clientY-250).css("left",location.clientX+25);
  });

  //hiding on card hover
  $(document).on("mouseout","img.cardssearch,img.question",function(location){
    $("#Photo").hide();
  });

  //Serching cards
  $.fn.ajaxrequest = function()
  {
    var name = $("#Name").val();
    var cost = $("#Cost").val();
    var rar = $("#Rarity").val();

    var red = $("#Red").is(":checked");
    var blue = $("#Blue").is(":checked");
    var black = $("#Black").is(":checked");
    var green = $("#Green").is(":checked");
    var white = $("#White").is(":checked");
    var less = $("#Less").is(":checked");
    var multi = $("#Multi").is(":checked");
    var legend = $("#Legend").is(":checked");

    var attack = $("#Attack").val();
    var tough = $("#Tough").val();
    var type = $("#Type").val();
    var stype = $("#Stype").val();
    var loyalty = $("#Loyalty").val();
    var effect = $("#Effect").val();

    if($(".tab").find(".active").attr("name") == "Comp")
      var comp = "true";
    else
      var comp = "false";

    $.ajax({
        url:"search/Wynik.php",
        method:"POST",
        data:{
                name:name,
                cost:cost,
                rar:rar,
                comp:comp,

                red:red,
                blue:blue,
                black:black,
                green:green,
                white:white,
                less:less,
                multi:multi,
                legend:legend,

                attack:attack,
                tough:tough,
                type:type,
                stype:stype,
                loyalty:loyalty,
                effect:effect,
        },
        success:function(data){
          $("#Cards").html(data);
        }
      });
  }

  //initializing start search
  $(this).ajaxrequest();

  //removing cards
  $(document).on('click','tr',function(){

    if(parseInt($(this).find(".amount").html())==1)
    {
      $(this).remove();
    }
    else
    {
      $(this).find(".amount").html(parseInt($(this).find(".amount").html())-1);
    }

      var active = $(".tab").find(".active").attr("name");

      switch(active)
      {
        case "Main":
          amain--;
          $(this).setamount();
          break;
        case "Side":
          aside--;
          $(this).setamount();
          break;
        case "Comp":
          acomp--;
          $(this).setamount();
          break;
      }

  });

  //on changing textbox search
  $(".searchbox").keyup(function(){

    clearTimeout(timer);

    timer = setTimeout (() => {
      $(this).ajaxrequest();
    } ,500)

  });

  //on checkbox press search
  $(".check").change(function(){
    if($(this).is(':checked'))
      $('label[for="' + $(this).attr('id') + '"]').find(".photobox").attr("src","checkbox/"+$(this).attr('id')+".png");
    else
      $('label[for="' + $(this).attr('id') + '"]').find(".photobox").attr("src","checkbox/"+$(this).attr('id')+"2.png");

    $(this).ajaxrequest();
  });

  //on rarity selection search
  $("#Rarity").change(function(){
    $(this).ajaxrequest();
  });

  //ading card to deck
  $(document).on("click","img.cardssearch",function(){

    var amount;
    var active = $(".tab").find(".active").attr("name");
    var set = true;

    amount = 0;

    if($("#MainT").find("."+$(this).attr("number")).length!=0)
      amount += parseInt($("#MainT").find("."+$(this).attr("number")).find(".amount").html());

    if($("#SideT").find("."+$(this).attr("number")).length!=0)
      amount += parseInt($("#SideT").find("."+$(this).attr("number")).find(".amount").html());

    if($("#CompT").find("."+$(this).attr("number")).length!=0)
      amount += parseInt($("#CompT").find("."+$(this).attr("number")).find(".amount").html());

      var cardcost = $(this).attr("cost");
      var cardname = $(this).attr("name");
      var cardnumber = $(this).attr("number");
      var cardsrc = $(this).attr("src");

      if(amount < 4 || $(this).attr("Type") == "Basic Land")
      {
        if($("#"+active+"T").find("."+$(this).attr("number")).length==0)
        {
              switch (active) {
                case "Main":
                $("#"+active+"T tbody").find('tr').each(function (i) {
                    if(i!=0)
                    {
                      if(cardcost == $(this).find('td').eq(0).text())
                        {
                          if(cardname<$(this).find('td').eq(1).text())
                          {
                            $(this).before("<tr class='"+cardnumber+"'> <td class='td1'>"+cardcost+"</td> <td class='td2'><span>"+cardname+"</span></td> <td class='amount'>"+1+"</td></tr>");
                            $("."+cardnumber).find(".td2").css('background-image', 'url(' + cardsrc + ')');
                            $("."+cardnumber).find(".td2").css('background-position', '30% 20%');
                            amain++;
                            $(this).setamount();
                            set = false;
                            return false;
                          }
                        }
                      else if(cardcost < $(this).find('td').eq(0).text())
                        {
                          $(this).before("<tr class='"+cardnumber+"'> <td class='td1'>"+cardcost+"</td> <td class='td2'><span>"+cardname+"</span></td> <td class='amount'>"+1+"</td></tr>");
                          $("."+cardnumber).find(".td2").css('background-image', 'url(' + cardsrc + ')');
                          $("."+cardnumber).find(".td2").css('background-position', '30% 20%');
                          amain++;
                          $(this).setamount();
                          set = false;
                          return false;
                        }
                    }
                });
                  if(set)
                  {
                  $("#"+active+"T").append("<tr class='"+$(this).attr("number")+"'> <td class='td1'>"+$(this).attr("cost")+"</td> <td class='td2'><span>"+$(this).attr("name")+"</span></td> <td class='amount'>"+1+"</td></tr>");
                  $("."+$(this).attr("number")).find(".td2").css('background-image', 'url(' + $(this).attr("src") + ')');
                  $("."+$(this).attr("number")).find(".td2").css('background-position', '30% 20%');
                  amain++;
                  $(this).setamount();
                  }
                  break;
                case "Side":
                  if(aside<(15-acomp))
                  {
                    $("#"+active+"T tbody").find('tr').each(function (i) {
                        if(i!=0)
                        {
                          if(cardcost == $(this).find('td').eq(0).text())
                            {
                              if(cardname<$(this).find('td').eq(1).text())
                              {
                                $(this).before("<tr class='"+cardnumber+"'> <td class='td1'>"+cardcost+"</td> <td class='td2'><span>"+cardname+"</span></td> <td class='amount'>"+1+"</td></tr>");
                                $("."+cardnumber).find(".td2").css('background-image', 'url(' + cardsrc + ')');
                                $("."+cardnumber).find(".td2").css('background-position', '30% 20%');
                                aside++;
                                $(this).setamount();
                                set = false;
                                return false;
                              }
                            }
                          else if(cardcost < $(this).find('td').eq(0).text())
                            {
                              $(this).before("<tr class='"+cardnumber+"'> <td class='td1'>"+cardcost+"</td> <td class='td2'><span>"+cardname+"</span></td> <td class='amount'>"+1+"</td></tr>");
                              $("."+cardnumber).find(".td2").css('background-image', 'url(' + cardsrc + ')');
                              $("."+cardnumber).find(".td2").css('background-position', '30% 20%');
                              aside++;
                              $(this).setamount();
                              set = false;
                              return false;
                            }
                        }
                    });
                      if(set)
                      {
                      $("#"+active+"T").append("<tr class='"+$(this).attr("number")+"'> <td class='td1'>"+$(this).attr("cost")+"</td> <td class='td2'><span>"+$(this).attr("name")+"</span></td> <td class='amount'>"+1+"</td></tr>");
                      $("."+$(this).attr("number")).find(".td2").css('background-image', 'url(' + $(this).attr("src") + ')');
                      $("."+$(this).attr("number")).find(".td2").css('background-position', '30% 20%');
                      aside++;
                      $(this).setamount();
                      }
                  }
                  break;
                case "Comp":
                if(acomp!=1 && aside <15)
                {
                  $("#"+active+"T").append("<tr class='"+$(this).attr("number")+"'> <td class='td1'>"+$(this).attr("cost")+"</td> <td class='td2'><span>"+$(this).attr("name")+"</span></td> <td class='amount'>"+1+"</td></tr>");
                  $("."+$(this).attr("number")).find(".td2").css('background-image', 'url(' + $(this).attr("src") + ')');
                  $("."+$(this).attr("number")).find(".td2").css('background-position', '30% 20%');
                  acomp++;
                  $(this).setamount();
                  break;
                }
              }
        }
        else
          {
            switch (active) {
              case "Main":
                $("#"+active+"T").find("."+$(this).attr("number")).find(".amount").html(parseInt( $("#"+active+"T").find("."+$(this).attr("number")).find(".amount").html())+1);
                amain++;
                $(this).setamount();
                break;
              case "Side":
                if(aside<(15-acomp))
                {
                  $("#"+active+"T").find("."+$(this).attr("number")).find(".amount").html(parseInt( $("#"+active+"T").find("."+$(this).attr("number")).find(".amount").html())+1);
                  aside++;
                  $(this).setamount();
                  break;
                }
            }
          }
      }

  });

  //deck exporting
  $("#ExportDe").click(function(){
    var decklist="";
    if(amain>=60)
    {
      if(acomp == 1)
      {
        decklist+="Companion\n"
        var td = $("#CompT tbody").find('tr').find('td');
        var compname = td.eq(1).text();
        decklist+="1 "+compname+"\n\n";
      }

      decklist+="Deck\n"

      $("#MainT tbody").find('tr').each(function (i) {
          if(i!=0)
          {
            var td = $(this).find('td');
            var amount = td.eq(2).text();
            var name = td.eq(1).text();
            decklist+=amount+" "+name+"\n";
          }
      });
      decklist+="\nSideboard\n";

      $("#SideT tbody").find('tr').each(function (i) {
          if(i!=0)
          {
            var td = $(this).find('td');
            var amount = td.eq(2).text();
            var name = td.eq(1).text();
            decklist+=amount+" "+name+"\n";
          }
      });
      if(acomp == 1)
        decklist+="1 "+compname;

      navigator.clipboard.writeText(decklist);
      alert(decklist);
    }
    else
    {
      alert("Talia musi sie skladac z przynajmniej 60 kart")
    }
  });

  //changing deck tabs
  $(".tablinks").click(function(){

    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");

    for (i = 0; i < tabcontent.length; i++)
    {
      tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++)
    {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(this.name).style.display = "block";
    this.className += " active";

    $(this).setamount();
    $.fn.ajaxrequest();

  });

  $.fn.setamount = function()
  {
    var active = $(".tab").find(".active").attr("name");

    switch (active) {
      case "Main":
        $("#Capacity").html(amain+"/60");
        break;
      case "Side":
        if(acomp == 1)
          $("#Capacity").html(aside+"/14");
        else
          $("#Capacity").html(aside+"/15");
        break;
      case "Comp":
        if(aside == 15)
          $("#Capacity").html(acomp+"/0");
        else
          $("#Capacity").html(acomp+"/1");
        break;
    }
  }

  });
