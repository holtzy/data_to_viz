fileNames <- Sys.glob("*.Rmd")
for( i in fileNames){
	rmarkdown::render(i)
}
