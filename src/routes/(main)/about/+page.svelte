<script lang="ts">
    let sitetitle = "เกี่ยวกับ";
	import Heading from "../../head.svelte"

    import * as Card from "$lib/components/ui/card/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { House } from "@lucide/svelte";
    import { Separator } from "$lib/components/ui/separator/index.js";

    import { goto } from "$app/navigation";

    export let data;

    const home = () => {
        goto(`/user/${data.user}`);
    };
</script>

<Heading SiteHead={sitetitle}/>


<div class="min-h-screen bg-border font-[sarabun]">
    <div class="flex text-center justify-center">
        <div
            class="absolute top-0 p-2 backdrop-blur-sm flex flex-row border-slate-200 border-1"
        >
            <Button
                onclick={home}
                variant="default"
                type="submit"
                class="transition border-1 border-slate-600 duration-300 text-slate-600 bg-slate-200 hover:bg-slate-400"
                ><House />Home</Button
            >
        </div>
        <div class="flex flex-col max-w-[400px] justify-self-center">
            <Card.Root
                class="flex p-2 ml-25vw mr-25vw mt-16 max-w-[350px] bg-card border-ring"
            >
                <Card.Header>
                    <Card.Title class="font-medium text-2xl"
                        >เกี่ยวกับ</Card.Title
                    >
                    <Card.Description>Card Description</Card.Description>
                </Card.Header>
                <Card.Content class="p-6">
                    <p>
                        "เก็บสบู่กันไหม?" คำถามสั้น ๆ ที่ดูเหมือนจะเป็นเรื่องขำ
                        ๆ ในตอนแรก แต่จริง ๆ แล้วมันคือ "บทเรียนราคาแพง"
                        ที่ทำให้ผมเจ็บปวดลึกถึงกระดูกดำ!
                        เรื่องมันเริ่มต้นจากพี่เบิ้มใจดีท่านหนึ่งที่บอกว่าจะให้ผมช่วยเก็บสบู่
                        ผมไม่คิดอะไรมากเพราะคิดว่าเป็นโอกาสดีที่จะได้ทำตัวเป็นที่รักของทุกคน
                        ในตอนแรกผมก็ไม่รู้เลยว่าจะเกิดอะไรขึ้น
                        แต่เพราะพี่เบิ้มคนนี้เป็นคนที่ "จริงใจ" ผมเลยตอบตกลงไป
                        พี่เบิ้มบอกแค่ว่า "น้องช่วยเก็บสบู่ให้พี่หน่อยได้ไหม?"
                        ซึ่งตอนนั้นผมไม่ได้ถามมากมาย พอได้ยินแบบนั้นก็
                        "โอเคเลย!" คิดในใจว่า "ไม่เป็นไรหรอก แค่สบู่เอง!"
                        แต่นี่สิครับ... "มันไม่ใช่แค่สบู่!"
                        ผมเดินไปหยิบสบู่ที่หล่นอยู่ตรงมุมห้องอาบน้ำ
                        โดยที่ยังไม่รู้เลยว่าผมกำลังเอาตัวเองเข้าไปอยู่ในสถานการณ์แบบไหน
                        พอผมหยิบสบู่ขึ้นมา พี่เบิ้มก็ยิ้มกว้างแล้วพูดว่า
                        "เก่งมากไอ้น้อง!" แล้วตอนนั้นผมก็ต้องสงบสติอารมณ์ที่สุด
                        เพราะ "มันไม่ใช่แค่การเก็บสบู่ธรรมดา!" ใช่ครับ
                        ผมยอมรับว่าผมช่วยพี่เขาจริง ๆ แต่ผมไม่รู้เลยว่ามันจะ
                        "เปลี่ยนชีวิตผมไปตลอดกาล!" พี่เบิ้มบอกว่า "น้องทำดีมาก
                        งั้นมาสนิทกันหน่อยนะ!" ผมเริ่มสงสัยแล้วว่า
                        "พี่จะทำอะไร?" "น้องกลิ่นหอมจังเลย"
                        พี่เบิ้มพูดพร้อมกับขยับเข้ามาใกล้ ผมเริ่มรู้แล้วว่า
                        "นี่มันไม่ใช่แค่การช่วยเหลือธรรมดาแล้ว!" แต่สุดท้าย...
                        ผมก็ช่วยเก็บสบู่ไปแล้ว ต้องรับผลของมัน!
                        ผมเดินกลับไปที่เตียงของผมด้วยอารมณ์ที่บอกไม่ถูก
                        เหมือนถูกหลอกมาโดยไม่รู้ตัว พี่เบิ้มก็ "ใจดี" จริง ๆ
                        แค่ใจดีในแบบที่ทำให้ผมได้ "บทเรียนราคาแพง" ที่ไม่อาจลืม!
                        และที่สำคัญ! "ศักดิ์ศรีของผมที่เคยมี" กลับกลายเป็นแค่
                        "ความทรงจำที่ไม่มีวันหวนคืน!"
                        บทสรุปของการเก็บสบู่ครั้งนี้คือ... ✅
                        ถามก่อนว่าใครเป็นคนทำสบู่ตก! ✅
                        บางครั้งสิ่งที่เราคิดว่าไม่มีอะไร
                        อาจจะเปลี่ยนชีวิตเราไปตลอดกาล! ✅
                        การช่วยเหลือไม่ใช่แค่เรื่องของน้ำใจ
                        แต่มันคือบทเรียนที่คุณจะไม่ลืมไปตลอดชีวิต! ✅
                        พี่เบิ้มใจดีอาจจะดีในแบบที่เราคิดไม่ถึง...
                        แต่บางทีก็มีผลข้างเคียงที่ทำให้เราเจ็บหนักได้! ✅
                        โมเดลขยับได้ยังไง? สุดท้ายนี้ก็อยากบอกว่า
                        "ทุกการเก็บสบู่มีความเสี่ยง" แต่สิ่งที่เราเผลอไปเก็บ
                        อาจจะทำให้เรารู้จักตัวเองมากขึ้น และทำให้เรา
                        "ไม่กล้าพลาดอีกครั้ง!" เก็บสบู่ #บทเรียนราคาแพง
                        #คำตอบจากเรือนจำ #พี่เบิ้มใจดี
                    </p>
                </Card.Content>
                <Card.Footer class="p-2 justify-between">
                    <a
                        href="https://github.com/KiryuuinNFB/Eventus"
                        class="transition duration-300 fixed hover:text-emerald-500"
                        >Github</a
                    >
                </Card.Footer>
            </Card.Root>
        </div>
    </div>
</div>
