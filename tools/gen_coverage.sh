#!/bin/bash

cd ./coverage

touch index.html

cat > index.html << _EOF_
<!doctype html>
<html lang="en">

<head>
    <title>Unit Testing Coverage Report</title>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="prettify.css" />
    <link rel="stylesheet" href="base.css" />
    <link rel="shortcut icon" type="image/x-icon" href="favicon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style type='text/css'>
        .coverage-summary .sorter {
            background-image: url(sort-arrow-sprite.png);
        }
    </style>
</head>

<body>
<div class='wrapper'>
    <div class='pad1'>
        <h1>All tests</h1>
        <div class='clearfix'>

            <div class='fl pad1y space-right2'>
                <span class="strong">00.00% </span>
                <span class="quiet">Statements</span>
                <span class='fraction'>0/0</span>
            </div>


            <div class='fl pad1y space-right2'>
                <span class="strong">00.00% </span>
                <span class="quiet">Branches</span>
                <span class='fraction'>0/0</span>
            </div>


            <div class='fl pad1y space-right2'>
                <span class="strong">00.00% </span>
                <span class="quiet">Functions</span>
                <span class='fraction'>0/0</span>
            </div>


            <div class='fl pad1y space-right2'>
                <span class="strong">00.00% </span>
                <span class="quiet">Lines</span>
                <span class='fraction'>0/0</span>
            </div>


        </div>
        <p class="quiet">
            Press <em>n</em> or <em>j</em> to go to the next uncovered block, <em>b</em>, <em>p</em> or <em>k</em> for the previous block.
        </p>
    </div>
    <div class='status-line high'></div>
    <div class="pad1">
<table class="coverage-summary">
<thead>
<tr>
   <th scope="col" data-col="file" data-fmt="html" data-html="true" class="file">File</th>
   <th scope="col" data-col="pic" data-type="number" data-fmt="html" data-html="true" class="pic"></th>
   <th scope="col" data-col="statements" data-type="number" data-fmt="pct" class="pct">Statements</th>
   <th scope="col" data-col="statements_raw" data-type="number" data-fmt="html" class="abs"></th>
   <th scope="col" data-col="branches" data-type="number" data-fmt="pct" class="pct">Branches</th>
   <th scope="col" data-col="branches_raw" data-type="number" data-fmt="html" class="abs"></th>
   <th scope="col" data-col="functions" data-type="number" data-fmt="pct" class="pct">Functions</th>
   <th scope="col" data-col="functions_raw" data-type="number" data-fmt="html" class="abs"></th>
   <th scope="col" data-col="lines" data-type="number" data-fmt="pct" class="pct">Lines</th>
   <th scope="col" data-col="lines_raw" data-type="number" data-fmt="html" class="abs"></th>
</tr>
</thead>
<tbody>
_EOF_

cd ./libs

calcDecimal() {
  if (($2 == 0)); then
    awk "BEGIN{ printf \"%.2f\n\", 100*0/10 }"
  else
    awk "BEGIN{ printf \"%.2f\n\", 100*$1/$2 }"
  fi
  }

calcPercentDiff() {
  awk "BEGIN{ printf \"%.2f\n\", 100-$1 }"
  }

calcColor() {
  if (( $(echo "$1 50.00" | awk '{print ($1 < 50.00)}') )); then
    echo 'low'
  elif (( $(echo "$1 70.00" | awk '{print ($1 < 70.00)}') )); then
    echo 'medium'
  else
    echo 'high'
  fi
  }

declare -i denomStatementsSum=0
declare -i numerStatementsSum=0
declare -i denomBranchesSum=0
declare -i numerBranchesSum=0
declare -i denomFunctionsSum=0
declare -i numerFunctionsSum=0
declare -i denomLinesSum=0
declare -i numerLinesSum=0

iteration=0

for dir in */; do
  cd $dir
  if [ -f index.html ]; then
    if [ "${iteration}" -eq "0" ]; then
      cp base.css ../../
      cp block-navigation.js ../../
      cp favicon.png ../../
      cp prettify.css ../../
      cp prettify.js ../../
      cp sort-arrow-sprite.png ../../
      cp sorter.js ../../
    fi
    iteration=$((iteration +1))

    newDir=${dir%/}

    denomStatements=$(grep -o -m 1 "<span class='fraction'>[^/]*" index.html | grep -o "[^>]*$")
    numerStatements=$(grep -o -m 1 "<span class='fraction'>[^<]*" index.html | grep -o "[^/]*$")
    denomStatementsSum=`expr $denomStatementsSum + $denomStatements`
    numerStatementsSum=`expr $numerStatementsSum + $numerStatements`
    statements=$(calcDecimal $denomStatements $numerStatements)
    echo "<tr>
	<td class='"file $(calcColor $statements)"' data-value='"$newDir"'><a href='"./libs/$newDir/index.html"'>$newDir</a></td>" >> ../../index.html
    echo "	<td data-value='"$statements"' class='"pic $(calcColor $statements)"'>
	<div class='"chart"'><div class='"cover-fill"' style='"width: $statements%"'></div><div class='"cover-empty"' style='"width: $(calcPercentDiff $statements)%"'></div></div>
	</td>
	<td data-value='"$statements"' class='"pct $(calcColor $statements)"'>$statements%</td>
	<td data-value='"$numerStatements"' class='"abs $(calcColor $statements)"'>$denomStatements/$numerStatements</td>" >> ../../index.html

    denomBranches=$(grep -o -m 2 "<span class='fraction'>[^/]*" index.html | tail -n1 | grep -o "[^>]*$")
    numerBranches=$(grep -o -m 2 "<span class='fraction'>[^<]*" index.html | tail -n1 | grep -o "[^/]*$")
    denomBranchesSum=`expr $denomBranchesSum + $denomBranches`
    numerBranchesSum=`expr $numerBranchesSum + $numerBranches`
    branches=$(calcDecimal $denomBranches $numerBranches)
    echo "	<td data-value='"$branches"' class='"pct $(calcColor $branches)"'>$branches%</td>
	<td data-value='"$numerBranches"' class='"abs $(calcColor $branches)"'>$denomBranches/$numerBranches</td>" >> ../../index.html

    denomFunctions=$(grep -o -m 3 "<span class='fraction'>[^/]*" index.html | tail -n1 | grep -o "[^>]*$")
    numerFunctions=$(grep -o -m 3 "<span class='fraction'>[^<]*" index.html | tail -n1 | grep -o "[^/]*$")
    denomFunctionsSum=`expr $denomFunctionsSum + $denomFunctions`
    numerFunctionsSum=`expr $numerFunctionsSum + $numerFunctions`
    functions=$(calcDecimal $denomFunctions $numerFunctions)
    echo "	<td data-value='"$functions"' class='"pct $(calcColor $functions)"'>$functions%</td>
	<td data-value='"$numerFunctions"' class='"abs $(calcColor $functions)"'>$denomFunctions/$numerFunctions</td>" >> ../../index.html

    denomLines=$(grep -o -m 4 "<span class='fraction'>[^/]*" index.html | tail -n1 | grep -o "[^>]*$")
    numerLines=$(grep -o -m 4 "<span class='fraction'>[^<]*" index.html | tail -n1 | grep -o "[^/]*$")
    denomLinesSum=`expr $denomLinesSum + $denomLines`
    numerLinesSum=`expr $numerLinesSum + $numerLines`
    lines=$(calcDecimal $denomLines $numerLines)
    echo "	<td data-value='"$lines"' class='"pct $(calcColor $lines)"'>$lines%</td>
	<td data-value='"$numerLines"' class='"abs $(calcColor $lines)"'>$denomLines/$numerLines</td>
  </tr>" >> ../../index.html
  fi
  cd ..
done

echo "</tbody>
</table>
</div>
                <div class='push'></div><!-- for sticky footer -->
            </div><!-- /wrapper -->
            <div class='footer quiet pad2 space-top1 center small'>
                Code coverage generated by
                <a href="https://istanbul.js.org/" target="_blank">istanbul</a>
                at Thu Jan 14 2021 09:50:44 GMT-0800 (Pacific Standard Time)
            </div>
        </div>
        <script src="prettify.js"></script>
        <script>
            window.onload = function () {
                prettyPrint();
            };
        </script>
        <script src="sorter.js"></script>
        <script src="block-navigation.js"></script>
    </body>
</html>
" >> ../index.html

cd ..

# add .bak to run with macos sed, e.g. "sed -i .bak"

sed -i "25s#.*#                <span class='strong'>$(calcDecimal $denomStatementsSum $numerStatementsSum)% </span>#" index.html
sed -i "27s#.*#                <span class='fraction'>$denomStatementsSum/$numerStatementsSum</span>#" index.html

sed -i "32s#.*#                <span class='strong'>$(calcDecimal $denomBranchesSum $numerBranchesSum)% </span>#" index.html
sed -i "34s#.*#                <span class='fraction'>$denomBranchesSum/$numerBranchesSum</span>#" index.html

sed -i "39s#.*#                <span class='strong'>$(calcDecimal $denomFunctionsSum $numerFunctionsSum)% </span>#" index.html
sed -i "41s#.*#                <span class='fraction'>$denomFunctionsSum/$numerFunctionsSum</span>#" index.html

sed -i "46s#.*#                <span class='strong'>$(calcDecimal $denomLinesSum $numerLinesSum)% </span>#" index.html
sed -i "48s#.*#                <span class='fraction'>$denomLinesSum/$numerLinesSum</span>#" index.html

totStatements=$(calcDecimal $denomStatementsSum $numerStatementsSum)
sed -i "57s#.*#    <div class='status-line $(calcColor $totStatements)'></div>#" index.html

echo "totalStatements   : $(calcDecimal $denomStatementsSum $numerStatementsSum)% ( $denomStatementsSum/$numerStatementsSum )"
echo "totalBranches     : $(calcDecimal $denomBranchesSum $numerBranchesSum)% ( $denomBranchesSum/$numerBranchesSum )"
echo "totalFunctions    : $(calcDecimal $denomFunctionsSum $numerFunctionsSum)% ( $denomFunctionsSum/$numerFunctionsSum )"
echo "totalLines        : $(calcDecimal $denomLinesSum $numerLinesSum)% ( $denomLinesSum/$numerLinesSum )"
