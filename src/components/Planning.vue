<template>
    <div>
        <button v-on:click="viewCalendarDay">ViewDay</button>
        <button v-on:click="viewCalendarWeek">ViewWeek</button>
        <button v-on:click="viewCalendarMonth">ViewMonth</button>
        <button v-on:click="backCalendar">back</button>
        <button v-on:click="nextCalendar">next</button>



        <calendar ref="calendar" style=" width:100%; height:800px; padding-left: 400px"
                  :calendars="calendarList"
                  :schedules="scheduleList"
                  :view="view"
                  :taskView="taskView"
                  :scheduleView="scheduleView"
                  :theme="theme"
                  :week="week"
                  :month="month"
                  :timezones="timezones"
                  :disableDblClick="disableDblClick"
                  :isReadOnly="isReadOnly"
                  :template="template"
                  :useCreationPopup="useCreationPopup"
                  :useDetailPopup="useDetailPopup"
        />


    </div>
</template>

<script>
    import 'tui-calendar/dist/tui-calendar.css'
    import Calendar from '@toast-ui/vue-calendar/src/Calendar.vue'

    export default {
        name: "Planning",
        components: {
            'calendar': Calendar
        },
        mounted() {

            let user = JSON.parse(localStorage.getItem('user'))
            let userId = user.id
            console.log('post')
            this.$http.post('http://localhost:3000/agendaPlanning', {
                userId: userId,
            })
                .then(response => {
                    localStorage.setItem('planning', JSON.stringify(response.data.planning))
                    console.log(response.data.planning)
                    response.data.planning.forEach(event => {
                        let tempEvent = {
                            id: event.id,
                            calendarId: event.id,
                            title: event.category,
                            category: 'time',
                            dueDateClass: '',
                            start: event.dateBegin,
                            end: event.dateEnd
                        }
                        this.scheduleList.push(tempEvent)
                    })
                    // console.log(event)
                })


            // if(localStorage.getItem('planning') != null){
            //     let planning = JSON.parse(localStorage.getItem('planning'))
            //
            //
            //     planning.forEach(event => {
            //         // console.log(event)
            //         let tempEvent = {
            //             id: event.id,
            //             calendarId: event.id,
            //             title: event.category,
            //             category: 'time',
            //             dueDateClass: '',
            //             start: event.dateBegin,
            //             end: event.dateEnd
            //         }
            //         this.scheduleList.push(tempEvent)
            //         })
            //     console.log( this.scheduleList)
            //
            // }
        },
        data() {
            return {

                calendarList: [
                    {
                        id: '0',
                        name: 'home'
                    },
                    {
                        id: '1',
                        name: 'office'
                    }
                ],
                scheduleList: [],

                view: 'month',

                taskView: false,
                scheduleView: ['time'],
                theme: {
                    'month.dayname.height': '30px',
                    'month.dayname.borderLeft': '1px solid #ff0000',
                    'month.dayname.textAlign': 'center',
                    'week.today.color': '#333',
                    'week.daygridLeft.width': '100px',
                    'week.timegridLeft.width': '100px'
                },
                week: {
                    narrowWeekend: true,
                    showTimezoneCollapseButton: true,
                    timezonesCollapsed: false
                },
                month: {
                    visibleWeeksCount: 4,
                    startDayOfWeek: 1
                },
                timezones: [{
                    timezoneOffset: 540,
                    displayLabel: 'GMT+09:00',
                    tooltip: 'Seoul'
                }, {
                    timezoneOffset: -420,
                    displayLabel: 'GMT-08:00',
                    tooltip: 'Los Angeles'
                }],
                disableDblClick: true,
                isReadOnly: true,
                template: {
                    milestone: function (schedule) {
                        return `<span style="color:red;">${schedule.title}</span>`;
                    },
                    milestoneTitle: function () {
                        return 'MILESTONE';
                    },
                },
                useCreationPopup: true,
                useDetailPopup: false,
            }
        },
        methods: {
            nextCalendar: function () {
                this.$refs.calendar.invoke('next');
            },
            backCalendar: function(){
                this.$refs.calendar.invoke('prev');
            },
            viewCalendarDay: function(){
                this.$refs.calendar.invoke('changeView','day','true')
            },
            viewCalendarWeek: function(){
                this.$refs.calendar.invoke('changeView','week','true')
            },
            viewCalendarMonth: function(){
                this.$refs.calendar.invoke('changeView','month','true')
            }



        }
    }




</script>

<style scoped>

</style>
