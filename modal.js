const buyBtns = document.querySelectorAll('.js-buy-product')
const modal = document.querySelector('.js-modal')// get class modal
const modalContainer= document.querySelector('.js-modal-container')
const modalClose = document.querySelector('.js-modal-close')

//hiển thị modal mua vé(thêm class open vào modal)
function showBuyAlbums(){
    modal.classList.add('open')
}
//ẩn modal( gỡ bỏ class open khỏi modal)
function hideBuyAlbums(){
    modal.classList.remove('open')
}

for(const buyBtn of buyBtns){/*tạo biến mới buyBtn , vòng lặp qua 3 nút của buyBtns*/
    buyBtn.addEventListener('click', showBuyAlbums)/*khi click vào buyBtn thì sẽ xử lí hàm sau dấu ,*/  
}

modalClose.addEventListener('click', hideBuyAlbums)

/*khi bấm ngoài modal thì modal đóng*/
modal.addEventListener('click',hideBuyAlbums);

modalContainer.addEventListener('click',function(event){
    event.stopPropagation()
})

/*Mobile menu responsive*/
/*phần bấm vào 3 vạch thì sẽ hiện menu header*/
var header = document.getElementById('header');
/*console.log(header); in bieens de xem lay dc chuwa */
var mobileMenu = document.getElementById('mobile-menu');
/*console.log(mobileMenu);*/
var headerHeight=header.clientHeight;


//Đóng mở mobile menu
mobileMenu.onclick= function(){
    /* console.log(header.clientHeight);*/

    var isClose = header.clientHeight === headerHeight;

    if(isClose){ /*nếu đang đóng . bấm vào thì thành mở thì chuyển sag auto*/
        header.style.height='auto';
    }else{
        header.style.height=null;
    }
}

//tự động đóng khi chọn menu
var menuItems = document.querySelectorAll('#navigation li a[href*="#"]');


for(var i=0; i< menuItems.length;i++){
    var menuItem = menuItems[i];
    // console.log(menuItem.nextElementSibling);

    menuItem.onclick= function(){ /*để ẩn menu*/
        //console.log(this);
    var isParentMenu= this.nextElementSibling && this.nextElementSibling.classList.contains('subnavigation');

        if(isParentMenu){
            event.preventDefault();
        }else{
            header.style.height=null;   
        }
    }
}
