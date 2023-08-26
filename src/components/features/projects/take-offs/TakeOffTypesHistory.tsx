import { motion } from 'framer-motion';
import { DeleteIcon } from '@/public/icons';
import { formatDate } from '@/utils/helpers';
import { ButtonRounded } from '@/components/shared/buttons';

const TakeOffTypesHistory = ({
    history
}: {
    history: TakeOffTypesHistory[];
}) => {
    return (
        <ul className="border-b border-line">
            {history.map((item) => (
                <motion.li
                    key={item.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="
                        grid grid-cols-4 h-[60px] place-content-center font-light px-[20px]
                        cursor-pointer bg-[#FAFAFA] text-[12px] text-[#8E8E93]
                    "
                >
                    <div className="flex items-center pl-[66px]">
                        <p>{formatDate(new Date(item.date))}</p>
                    </div>
                    <div className="flex items-center">
                        <p>{item.calculation}</p>
                    </div>
                    <div className="flex items-center">
                        <p>{item.total}</p>
                    </div>
                    <div className="flex items-center justify-end pr-[24px]">
                        <ButtonRounded
                            className="bg-transparent hover:bg-hover-secondary"
                            icon={
                                <DeleteIcon className="w-[18px] h-[18px] text-primary" />
                            }
                        />
                    </div>
                </motion.li>
            ))}
        </ul>
    );
};

export default TakeOffTypesHistory;
