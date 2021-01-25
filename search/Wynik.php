<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <?php
      $connection = new mysqli("localhost","root","","mtg");
      if ($connection->connect_error)
      {
        die("Connection failed: " . $connection->connect_error);
      }

      $search = array();
      $color = array();

      $n = $_POST["name"];
      $c = $_POST["cost"];
      $a = $_POST["attack"];
      $t = $_POST["tough"];
      $y = $_POST["type"];
      $s = $_POST["stype"];
      $l = $_POST["loyalty"];
      $e = $_POST["effect"];
      $le = $_POST["legend"];
      $ra = $_POST["rar"];

        $sql = "SELECT `ID`,`Name`,`Image`,`Type`,`Cost` FROM cards INNER JOIN color ON Card_color = ID_Color";

        if(!empty($n))
          $search[] = "Name LIKE '%".$n."%'";

        if($c === "0" || $c)
          $search[] = "Cost LIKE ".$c;

        if($a === "0" || $a)
            $search[] = "Atack LIKE ".$a;

        if($t === "0" || $t)
            $search[] = "`Toughness` LIKE ".$t;

        if($l === "0" || $l)
            $search[] = "`Loyalty` LIKE ".$l;

        if(!empty($y))
            $search[] = "Type LIKE '%".$y."%'";

        if(!empty($s))
            $search[] = "Sub_Type LIKE '%".$s."%'";

        if(!empty($e))
            $search[] = "Text LIKE '%".$e."%'";

        if($le == "true")
            $search[] = "Legendary LIKE ".$le."";

        if($ra != "-")
            {
              switch ($ra)
              {
                case "Common":
                  $search[] = "Rarity LIKE 'Common'";
                  break;
                case "Uncommon":
                  $search[] = "Rarity LIKE 'Uncommon'";
                    break;
                case "Rare":
                  $search[] = "Rarity LIKE 'Rare'";
                    break;
                case "Mythic":
                  $search[] = "Rarity LIKE 'Mythic'";
                    break;
              }
            }

        if(count($search)!=0)
        {
          $sql = $sql." WHERE ".$search[0];

          for($i=1;$i<=count($search)-1;$i++)
          {
            $sql = $sql. " AND ".$search[$i];
          }
        }
        $sql=$sql." GROUP BY `ID_Color`,`Cost`,`Name`";

        $red = $_POST["red"];
        $blue = $_POST["blue"];
        $black = $_POST["black"];
        $green = $_POST["green"];
        $white = $_POST["white"];
        $less = $_POST["less"];
        $multi = $_POST["multi"];

        if($red == "true")
            $color[] = "Color_name LIKE '%R%'";
        if($blue == "true")
            $color[] = "Color_name LIKE '%U%'";
        if($black == "true")
            $color[] = "Color_name LIKE '%B%'";
        if($green == "true")
            $color[] = "Color_name LIKE '%G%'";
        if($white == "true")
            $color[] = "Color_name LIKE '%W%'";
        if($less == "true")
            $color[] = "Color_name LIKE '%C%'";
        if($multi == "true")
            $color[] = "Color_name LIKE '%M%'";

        $sql2 = "";


        if(count($color)!=0)
        {
          $sql2 ="SELECT `ID`,`Name`,`Image`,`Type`,`Cost` FROM cards INNER JOIN color ON Card_color = ID_Color WHERE ".$color[0];
          if($multi == "true")
          {
            for($i=1;$i<=count($color)-1;$i++)
            {
              $sql2 = $sql2. " AND ".$color[$i];
            }
          }
          else
          {
            for($i=1;$i<=count($color)-1;$i++)
            {
              $sql2 = $sql2. " OR ".$color[$i];
            }
          }


          $sql2=$sql2." GROUP BY `ID_Color`,`Cost`,`Name`";
        }

        if(!empty($sql2))
        {
          $sql = $sql." INTERSECT ".$sql2;
        }

        $comp = $_POST["comp"];

        if($comp == "true")
        {
          $sql = $sql." INTERSECT SELECT `ID`,`Name`,`Image`,`Type`,`Cost` FROM cards INNER JOIN companions ON ID = ID_Card";
        }

      //echo($sql);
      $result = $connection->query($sql);

      if ($result->num_rows > 0)
      {
         while($r = $result->fetch_assoc())
         {
           echo '<div class="col-sm-3"><img class="cardssearch" name="'.$r['Name'].'" number="'.$r['ID'].'" cost="'.$r['Cost'].'" type="'.$r['Type'].'" src="data:image/jpeg;base64,'.base64_encode( $r['Image'] ).'"/></div>';
         }
      }
      else
      {
        echo '<div class="col-sm-4 offset-sm-4"><img class="question" src="checkbox/question.png"';
      }

      mysqli_close($connection);
    ?>
</html>
