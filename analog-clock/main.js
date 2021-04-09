const refs = {
	second: document.querySelector('.second-hand'),
	minute: document.querySelector('.min-hand'),
	hour: document.querySelector('.hour-hand'),
};

const getSecondsRotateAngle = (date) => date.getSeconds() / 60 * 360 - 90;

const getMinutesRotateAngle = (date) => date.getMinutes() / 60 * 360 + date.getSeconds() / 60 * 6 - 90;

const getHoursRotateAngle = (date) => date.getHours() / 12 * 360 + date.getMinutes() / 60 * 30 - 90;

const setDate = () => {
	const date = new Date();

	refs.second.style.transform = `rotate(${getSecondsRotateAngle(date)}deg)`;
	refs.minute.style.transform = `rotate(${getMinutesRotateAngle(date)}deg)`;
	refs.hour.style.transform = `rotate(${getHoursRotateAngle(date)}deg)`;
};

setInterval(setDate, 1000);

setDate();
