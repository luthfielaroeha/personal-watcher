package main

func main() {
	prepareSensor()
	prepareAI()
	blockForever()
}

func blockForever() {
	select { }
}
