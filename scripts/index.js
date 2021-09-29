class App {
    constructor() {
        this.mentorData = []
        this.eventsData = []
        this.slides = ['hours-first', 'hours-second', 'website', 'events-container']
        this.sidx = 0
        this.getData()
        this.setTimeouts()
    }

    addMentorData = () => {
        this.mentorData.forEach((mentor, idx) => {
            let mentorEl = document.createElement('div')
            mentorEl.classList.add('mentor-row')
            for (let jidx = 0; jidx < 3; jidx++) {
                let el = document.createElement('div')
                el.innerText = mentor[jidx]
                el.id = `${idx}-${jidx}`
                mentorEl.appendChild(el)
            }
            let parentEl = idx < 6 ? 'hours-first' : 'hours-second'
            document.getElementById(parentEl).appendChild(mentorEl)
        })
    }

    addEventsData = () => {
        this.eventsData.forEach((event, idx) => {
            let eventEl = document.createElement('div')
            eventEl.classList.add('event-row')
            for (let jidx = 0; jidx < 3; jidx++) {
                let el = document.createElement('div')
                el.innerText = event[jidx]
                el.id = `event-${idx}-${jidx}`
                eventEl.appendChild(el)
            }
            document.getElementById('events').appendChild(eventEl)
        })
    }

    changeSlide = () => {
        this.sidx = this.sidx === this.slides.length - 1 ? 0 : this.sidx + 1

        switch (this.sidx) {
            case 0:
                this.transition(this.slides[this.slides.length - 1], this.slides[0])
                break
            case 1:
            case 2:
            case 3:
            default:
                this.transition(this.slides[this.sidx - 1], this.slides[this.sidx])
                break
        }
    }

    appear = (el) => {}

    transition = (oldId, newId) => {
        let oldEl = document.querySelector(`#${oldId}`)
        let newEl = document.querySelector(`#${newId}`)
        oldEl.classList = 'animate__animated'
        newEl.classList = 'animate__animated'

        oldEl.classList.add('animate__fadeOutLeft')
        newEl.classList.add('animate__fadeInRight')
    }

    checkData = () => {
        fetch('/hours')
            .then(res => res.json())
            .then(({ data }) => {
                let newData = data.values
                for (let idx = 0; idx < newData.length; idx++) {
                    for (let jidx = 0; jidx < newData[idx].length; jidx++) {
                        if (newData[idx][jidx] !== this.mentorData[idx][jidx]) {
                            document.getElementById(`${idx}-${jidx}`).innerText = newData[idx][jidx]
                        }
                    }
                }
                this.mentorData = newData
            })
        fetch('/events')
            .then(res => res.json())
            .then(({ data }) => {
                let newData = data.values
                for (let idx = 0; idx < newData.length; idx++) {
                    for (let jidx = 0; jidx < newData[idx].length; jidx++) {
                        if (newData[idx][jidx] !== this.eventsData[idx][jidx]) {
                            document.getElementById(`events-${idx}-${jidx}`).innerText = newData[idx][jidx]
                        }
                    }
                }
                this.mentorData = newData
            })
    }

    getData = () => {
        fetch('/hours')
            .then(res => res.json())
            .then(({ data }) => {
                this.mentorData = data.values
                this.addMentorData()
            })
        fetch('/events')
            .then(res => res.json())
            .then(({ data }) => {
                this.eventsData = data.values
                if (!this.eventsData) {
                    this.slides.pop()
                } else {
                    this.addEventsData()
                }
            })
    }

    setTimeouts = () => {
        setInterval(this.changeSlide, 50000)
        setInterval(this.checkData, 100000)
    }
}


let app = new App()