# V3 Mobile update — 4 ตุลาคม 2026

รองรับมือถือและแท็บเล็ตในโปรเจกต์เดียวกับ desktop โดยเปลี่ยน layout ตามความกว้างจอ

## จุดที่ปรับ
- เมนูสาธารณะยุบเป็นเมนูมือถือ มีเข้าสู่ระบบและแจ้งปัญหา พร้อม aria-expanded และปิดด้วย Escape
- ปุ่ม QR และปุ่มเปิดเมนูไม่ล้นและอ่านได้บนพื้นหลังสีอ่อน
- Hero ปรับความสูงตามเนื้อหาและหน้าจอ, ช่องค้นหาเรียงแนวตั้ง
- การ์ดที่พักปัดแนวนอนได้, Directory/แผนที่และรายละเอียดจัดเป็นคอลัมน์เดียว
- แกลเลอรีรองรับปัดรูป, ปุ่มก่อนหน้า/ถัดไป, เปิดเต็มจอ, และเป้าสัมผัสที่ใหญ่ขึ้น
- ราคาเป็นแท็บแนวนอนที่ปัดได้ พร้อมเลื่อนให้แพ็กเกจที่เลือกอยู่ในสายตา
- Owner/Admin/User ใช้เมนูที่เปิดปิดได้บนมือถือ และเข้าถึงออกจากระบบได้
- Dashboard, ฟอร์ม, แถวรายการ, ปุ่มและ footer ปรับให้เหมาะกับจอเล็ก
- ช่องกรอกข้อมูลใช้ตัวอักษร 16px บนมือถือเพื่อลดการซูมตอนกรอกข้อมูล
- เก็บฟอนต์ไทย/อังกฤษพร้อม license ใน src/assets/fonts แทนการโหลดจาก Google Fonts

## ผลตรวจ
- TypeScript และ production build ผ่าน
- เปิด 54 page states ใน Chromium ที่ความกว้าง 320, 390, 768 และ 1365px ไม่พบเนื้อหาหน้าเว็บล้นแนวนอนหรือ runtime error
- ทดสอบเมนูมือถือ → Login, เมนู Owner → Villas, การเข้าถึง Logout, ปัดแกลเลอรี, เปิด/ปิดภาพเต็มจอ และเลือกแพ็กเกจ
- ตรวจภาพหน้า Home, Directory, Pricing, Detail และ Owner Dashboard ที่ 390px
- ระหว่างทดสอบ layout ปิดการโหลดรูปภายนอกเพื่อไม่ให้ผลตรวจขึ้นกับเครือข่าย รูป Unsplash ในเว็บไซต์ยังเป็น URL เดิม
- ยังไม่ได้ทดสอบบน iPhone/Android เครื่องจริง และไม่ได้ทดสอบกล้องจริง

## เอาขึ้น repo เดิม
1. แตก ZIP แล้วคัดลอกไฟล์ด้านใน DesignVillaCheck3-git ไปทับใน root ของ repo DesignVillaCheck3 เดิม
2. รักษาโฟลเดอร์ .git ของ repo เดิมไว้ ชุดนี้ไม่รวม .git, node_modules หรือ dist
3. ตรวจและ push:

```bash
npm ci
npm run build
git status
git add .
git commit -m "Add responsive mobile layouts for VillaCheck V3"
git push origin main
```

ไฟล์หลักที่เปลี่ยนคือ src/App.tsx, src/prototype.tsx, src/main.tsx, src/index.css และไฟล์ใหม่ src/mobile.css, src/fonts.css, src/assets/fonts/ ต้องคัดลอกไฟล์ฟอนต์ไปด้วย

ถ้า Vercel ผูกกับ repo/sาขานี้อยู่ deployment จะทำงานตามการตั้งค่าเดิมหลัง push
