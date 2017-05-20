package main

func main() {
	prepareSensor()
	blockForever()
}

func blockForever() {
	select { }
}
