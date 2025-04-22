<?php
  $connection = new mysqli("localhost","root","","mtg");
  if ($connection->connect_error)
  {
    die("Connection failed: " . $connection->connect_error);
  }

  $search = array();
  $sqlSearch = "";
  $color = array();
  $sqlColor = "";

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

  $red = $_POST["red"];
  $blue = $_POST["blue"];
  $black = $_POST["black"];
  $green = $_POST["green"];
  $white = $_POST["white"];
  $less = $_POST["less"];
  $multi = $_POST["multi"];

  $sql = "SELECT DISTINCT c.ID, c.Name, c.Image, c.Type, c.Cost FROM cards c JOIN card_colors cc ON c.ID = cc.Card_ID JOIN colors col ON cc.Color_ID = col.ID_Color";

  if(!empty($n))
    $search[] = "c.Name LIKE '%".$n."%'";

  if($c === "0" || $c)
    $search[] = "c.Cost LIKE ".$c;

  if($a === "0" || $a)
    $search[] = "c.Attack LIKE ".$a;

  if($t === "0" || $t)
    $search[] = "c.Toughness LIKE ".$t;

  if($l === "0" || $l)
    $search[] = "c.Loyalty LIKE ".$l;

  if(!empty($y))
    $search[] = "c.Type LIKE '%".$y."%'";

  if(!empty($s))
    $search[] = "c.Sub_Type LIKE '%".$s."%'";

  if(!empty($e))
    $search[] = "c.Text LIKE '%".$e."%'";

  if($le == "true")
    $search[] = "c.Legendary LIKE ".$le."";

  if($ra != "-")
  {
    switch ($ra)
    {
      case "Common":
        $search[] = "c.Rarity LIKE 'Common'";
        break;
      case "Uncommon":
        $search[] = "c.Rarity LIKE 'Uncommon'";
          break;
      case "Rare":
        $search[] = "c.Rarity LIKE 'Rare'";
          break;
      case "Mythic":
        $search[] = "c.Rarity LIKE 'Mythic'";
          break;
    }
  }

  if(count($search)!=0)
  {
    $sqlSearch = $search[0];
    for($i=1;$i<=count($search)-1;$i++)
    {
      $sqlSearch = $sqlSearch." AND ".$search[i];
    }
  }

  if($red == "true")
    $color[] = "'Red'";

  if($blue == "true")
    $color[] = "'Blue'";

  if($black == "true")
    $color[] = "'Black'";

  if($green == "true")
    $color[] = "'Green'";

  if($white == "true")
    $color[] = "'White'";

  if($less == "true")
    $color[] = "'Colorless'";

  if(count($color)!=0)
  {
    $sqlColor = $sqlColor."col.Name IN(".$color[0];
    for($i=1;$i<=count($color)-1;$i++)
    {
      $sqlColor = $sqlColor.",".$color[$i];
    }
    $sqlColor = $sqlColor.")";
  }

  if ($sqlSearch != "" && $sqlColor != "")
    $sql = $sql." WHERE ".$sqlSearch." AND ".$sqlColor;
  elseif ($sqlSearch != "")
    $sql = $sql." WHERE ".$sqlSearch;
  elseif ($sqlColor != "")
    $sql = $sql." WHERE ".$sqlColor;

  if($multi == "true")
  {
    if($sqlSearch != "" || $sqlColor != "")
      $sql = $sql." AND c.ID IN (SELECT c.ID FROM cards c JOIN card_colors cc ON c.ID = cc.Card_ID JOIN colors col ON cc.Color_ID = col.ID_Color GROUP BY c.ID HAVING COUNT(col.Name) > 1)";
    else
      $sql = $sql." WHERE c.ID IN (SELECT c.ID FROM cards c JOIN card_colors cc ON c.ID = cc.Card_ID JOIN colors col ON cc.Color_ID = col.ID_Color GROUP BY c.ID HAVING COUNT(col.Name) > 1)";
  }

  

  //echo($sql);
  $sql = $sql." ORDER BY c.Cost";
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
