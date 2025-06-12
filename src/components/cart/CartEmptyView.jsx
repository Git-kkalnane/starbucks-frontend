import { CommonBtn } from '../common/customBtn';
import { useNavigate } from 'react-router-dom';

function CartEmptyView({
    title = '장바구니가 비어있습니다',
    content = '원하는 메뉴를 장바구니에 담고\n한번에 주문해 보세요',
    btnTitle = '메뉴 담으러 가기',
    navigateTo = '/order',
    className,
}) {
    const navigate = useNavigate();
    return (
        <div className={`flex flex-col items-start justify-start mb-32 py-5 px-4  ${className}`}>
            <h3 className="text-xl font-bold text-gray-800 mb-1">{title}</h3>
            <p className="text-gray-500 mb-6 whitespace-pre-wrap">{content}</p>
            <CommonBtn
                onClick={() => navigate(navigateTo)}
                title={btnTitle}
                bgColor="bg-starbucks-green"
                className="text-white px-6 py-3 rounded-full font-medium hover:bg-[#1e8b4d] transition-colors"
            />
        </div>
    );
}

export default CartEmptyView;
