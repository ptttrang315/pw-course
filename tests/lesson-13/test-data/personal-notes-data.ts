export interface Actions  {
    action: string;
    description: string
}

export const actions: Actions[] = [
    {
        action: 'click',
        description: 'Hàm click dùng để thực hiện click vào các phần tử trên trang web'
    },
    {
        action: 'fill',
        description: 'Hàm fill dùng để điền văn bản vào các trường input hoặc textarea trên trang web'
    },
    {
        action: 'type',
        description: 'Hàm type dùng để nhập từng ký tự một vào phần tử, mô phỏng hành vi gõ phím thực tế của người dùng'
    },
    {
        action: 'hover',
        description: 'Hàm hover dùng để di chuyển con trỏ chuột đến vị trí của phần tử, kích hoạt các hiệu ứng hover'
    },
    {
        action: 'check',
        description: 'Hàm check dùng để đánh dấu checkbox hoặc radio button, đảm bảo phần tử ở trạng thái checked'
    },
    {
        action: 'uncheck',
        description: 'Hàm uncheck dùng để bỏ đánh dấu checkbox, đảm bảo phần tử ở trạng thái unchecked'
    },
    {
        action: 'selectOption',
        description: 'Hàm selectOption dùng để chọn một hoặc nhiều option trong thẻ select dropdown'
    },
    {
        action: 'press',
        description: 'Hàm press dùng để mô phỏng việc nhấn phím bàn phím như Enter, Tab, Escape hoặc các phím khác'
    },
    {
        action: 'dblclick',
        description: 'Hàm dblclick dùng để thực hiện double click (nhấp đúp chuột) vào phần tử trên trang web'
    },
    {
        action: 'dragAndDrop',
        description: 'Hàm dragAndDrop dùng để kéo một phần tử từ vị trí nguồn và thả vào vị trí đích trên trang web'
    }
];