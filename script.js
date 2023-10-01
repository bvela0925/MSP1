let move_speed = 3, grativy = 0.5;
let bird = document.querySelector('.bird');
let image = document.getElementById('.bird');

let bird_props = bird.getBoundingClientRect();

let background = document.querySelector('.background').getBoundingClientRect();

let point_val = document.querySelector('.point_val');
let message = document.querySelector('.message');
let point_title = document.querySelector('.point_title');

let game_state = 'Start';
image.style.display = 'none';
message.classList.add('messageStyle');

document.addEventListener('keydown' , (e) => {
    if(e.key == 'Enter' && game_state != 'Play'){
        document.querySelectorAll('.lower_obstacle').forEach((e) => {
            e.remove();
        });
        img.style.display  = 'block';
        bird.style.top = '40vh';
        game_state = 'Play';
        message.innerHTML = 'Score : ';
        points_val.innerHTML = '0';
        message.classList.remove('messageStyle');
        play();
    }
});

function play(){
    function move(){
        if(game_state != 'Play') return;

        let lower_obstacle = document.querySelectorAll('.lower_obstacle')
        lower_obstacle.forEach((element) => {
            let lower_obstacle = element.getBoundingClientRect();
            bird_props = bird.getBoundingClientRect();

            if(lower_obstacle.right <= 0){
                element.remove();
            }else{
                if(bird_props.left < lower_obstacle.left + lower_obstacle.width)
            }
        })
    }
}