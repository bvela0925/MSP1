let move_speed = 3, gravity = 0.5;
let bird = document.querySelector('.bird');
let img = document.getElementById('bird-1');



let bird_props = bird.getBoundingClientRect();



let background = document.querySelector('.background').getBoundingClientRect();



//point counter names/classifiers
let score_val = document.querySelector('.score_val');
let message = document.querySelector('.message');
let score_title = document.querySelector('.score_title');


//enter key begins game
let game_state = 'Start';
img.style.display = 'none';
message.classList.add('messageStyle');

document.addEventListener('keydown', (e) => {

    if(e.key == 'Enter' && game_state != 'Play'){
        document.querySelectorAll('.lower_obstacle').forEach((e) => {
            e.remove();
        });
        img.display = 'block';
        bird.style.top = '40vh';
        game_state = 'Play';
        message.innerHTML = '';
        score_title.innerHTML = 'Points : ';
        score_val.innerHTML = '0';
        message.classList.remove('messageStyle');
        play();
    }
});


//obstacle JS
function play(){
    function move(){
        if(game_state != 'Play') return;

        let lower_obstacle = document.querySelectorAll('.lower_obstacle')
        lower_obstacle.forEach((element) => {
            let lower_obstacle_props = element.getBoundingClientRect();
            bird_props = bird.getBoundingClientRect();

            if(lower_obstacle_props.right <= 0){
                element.remove();
            }else{
                if(bird_props.left < lower_obstacle_props.left + lower_obstacle_props.width && bird_props.left + bird_props.width > lower_obstacle_props.left && bird_props.top < lower_obstacle_props.top + lower_obstacle_props.height && bird_props.top + bird_props.height > lower_obstacle_props.top){
                    game_state = 'End';
                    message.innerHTML = 'You Lose.' + <br>'Hit Enter to try again!'</br>;
                    message.classList.add('messageStyle');
                    img.display = 'none';
                    return;
                }else{
                    if(lower_obstacle_props.right < bird_props.left && lower_obstacle_props.right + move_speed >= bird_props.left && element.increase_score == '1'){
                        score_val.innerHTML =+ score_val.innerHTML + 1;
                    }
                    element.style.left = lower_obstacle_props.left - move_speed + 'px';
                }
            }
        });
        requestAnimationFrame(move);
    }
    requestAnimationFrame(move);

    //start game & bird flying ("flapping") image change
    let bird_dy = 0;
    function apply_gravity(){
        if(game_state != 'Play') return;
        bird_dy = bird_dy + gravity;
        document.addEventListener('keydown', (e) => {
            if(e.key == 'ArrowUP' || e.key == ' '){
                img.src = 'images/main.character.bird.flap.png';
                bird_dy = -7.6;
            }
        });

        document.addEventListener('keyup', (e) => {
            if(e.key == 'ArrowUp' || e.key == ' '){
                img.src = 'images/main.character.bird.png';
            }
        });

        if(bird_props.top <= 0 || bird_props.bottom >= background.bottom){
            game_state = 'End';
            message.style.left = '28vw';
            window.location.reload();
            message.classList.remove('messageStyle');
            return;
        }
        bird.style.top = bird_props.top + bird_dy + 'px';
        bird_props = bird.getBoundingClientRect();
        requestAnimationFrame(apply_gravity);
    }
    requestAnimationFrame(apply_gravity);


    let lower_obstacle_seperation = 0;
    let lower_obstacle_gap = 35;

    function create_obstacle(){
        if(game_state != 'Play') return;

        if(lower_obstacle_seperation > 115){
            lower_obstacle_seperation = 0;

            let lower_obstacle_posi = Math.floor(Math.random() * 43) + 8;
            let lower_obstacle_inv = document.createElement('div');
            lower_obstacle_inv.className = 'lower_obstacle';
            lower_obstacle_inv.style.top = lower_obstacle_posi - 70 + 'vh';
            lower_obstacle_inv.style.left = '100vw';

            document.body.appendChild(lower_obstacle_inv);
            let lower_obstacle = document.createElement('div');
            lower_obstacle.className = 'lower_obstacle';
            lower_obstacle.style.top = lower_obstacle_posi + lower_obstacle_gap + 'vh';
            lower_obstacle.style.left = '100vw';
            lower_obstacle.increase_score = '1';

            document.body.appendChild(lower_obstacle);
        }
       lower_obstacle_seperation++;
        requestAnimationFrame(create_obstacle);
    }
    requestAnimationFrame(create_obstacle);
}