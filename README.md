First of all I need to create matrix or empty board and the matrix has certain props like mine or if its empty or how
many mines are around using ```emptyBoard()```.

When I have the matrix I will plant mines on random places in the matrix using ```setMinesOnBoard()```.

When I set up all the mines I then need to find out where on the board is cell located for that I am
using ```examineEachCell()``` to create area around the cell and in that area I am looking for the mines and I add mine
counter for each mine in the area of the cell however if there is no mine in the area I can tag the cell empty.

Finally I just render the matrix.