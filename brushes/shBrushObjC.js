/**
* Objective-c Brush For SyntaxHighlighter
*
* Based on
*     https://github.com/syntaxhighlighter/brush-cpp/
*
*/
;(function()
{
  // CommonJS
  typeof(require) != 'undefined' ? SyntaxHighlighter = require('shCore').SyntaxHighlighter : null;
 
  function Brush()
  {
    // Copyright 2006 Shin, YoungJin
    // Copyright 2015 Jody Hagins
    var datatypes = 'ATOM BOOL BOOLEAN BYTE CHAR COLORREF DWORD DWORD32 DWORD64 DWORDLONG ' +
                    'DWORD_PTR FILE FLOAT HACCEL HALF_PTR HANDLE HBITMAP HBRUSH HCOLORSPACE ' +
                    'HCONV HCONVLIST HCURSOR HDC HDDEDATA HDESK HDROP HDWP HENHMETAFILE ' +
                    'HFILE HFONT HGDIOBJ HGLOBAL HHOOK HICON HINSTANCE HKEY HKL HLOCAL ' +
                    'HMENU HMETAFILE HMODULE HMONITOR HPALETTE HPEN HRESULT HRGN HRSRC ' +
                    'HSZ HWINSTA HWND INT INT32 INT64 INT_PTR LANGID LCID LCTYPE LGRPID ' +
                    'LONG LONG32 LONG64 LONGLONG LONG_PTR LPARAM LPBOOL LPBYTE LPCOLORREF ' +
                    'LPCSTR LPCTSTR LPCVOID LPCWSTR LPDWORD LPHANDLE LPINT LPLONG LPSTR ' +
                    'LPTSTR LPVOID LPWORD LPWSTR LRESULT PBOOL PBOOLEAN PBYTE PCHAR PCSTR ' +
                    'PCTSTR PCWSTR PDWORD32 PDWORD64 PDWORDLONG PDWORD_PTR PFLOAT ' +
                    'PHALF_PTR PHANDLE PHKEY PINT PINT32 PINT64 PINT_PTR PLCID PLONG ' +
                    'PLONG32 PLONG64 PLONGLONG PLONG_PTR POINTER_32 POINTER_64 PSHORT ' +
                    'PSIZE_T PSSIZE_T PSTR PTBYTE PTCHAR PTSTR PUCHAR PUHALF_PTR PUINT ' +
                    'PUINT32 PUINT64 PUINT_PTR PULONG PULONG32 PULONG64 PULONGLONG ' +
                    'PULONG_PTR PUSHORT PVOID PWCHAR PWORD PWSTR SC_HANDLE SC_LOCK ' +
                    'SERVICE_STATUS_HANDLE SHORT SIZE_T SSIZE_T TBYTE TCHAR UCHAR ' +
                    'UHALF_PTR UINT UINT32 UINT64 UINT_PTR ULONG ULONG32 ULONG64 ' +
                    'ULONGLONG ULONG_PTR USHORT USN VOID WCHAR WORD WPARAM WPARAM ' +
                    'WPARAM _EXCEPTION_POINTERS _FPIEEE_RECORD _HEAPINFO _HFILE _PNH ' +
                    '__finddata64_t __int16 __int32 __int64 __int8 __stat64 __time64_t ' +
                    '__timeb64 __wchar_t __wfinddata64_t _complex _dev_t _diskfree_t ' +
                    '_exception _finddata_t _finddatai64_t _off_t _onexit_t ' +
                    '_purecall_handler _stat _stati64 _timeb _utimbuf _wfinddata_t ' +
                    '_wfinddatai64_t bool char char16_t char32_t clock_t div_t ' +
                    'double float fpos_t id instancetype int int16_t int32_t int64_t ' +
                    'int8_t intptr_t jmp_buf lconv ldiv_t long mbstate_t ptrdiff_t ' +
                    'short sig_atomic_t signed size_t terminate_function time_t ' +
                    'tm uint16_t uint32_t uint64_t uint8_t uintptr_t unsigned ' +
                    'va_list void wchar_t wctrans_t wctype_t wint_t ';

    var keywords =  'Class IBAction IBOutlet NO NULL SEL YES __bridge __declspec __exception ' +
                    '__finally __try __weak _cmd alignas alignof assign atomic auto ' +
                    'break case catch class const const_cast constexpr continue ' +
                    'decltype default delete deprecated dllexport dllimport do ' +
                    'dynamic_cast else enum explicit extern false for friend ' +
                    'getter goto if inline mutable naked namespace new nil ' +
                    'noexcept noinline nonatomic noreturn nothrow nullptr ' +
                    'private protected public readonly readwrite register ' +
                    'reinterpret_cast retain return selectany self setter ' +
                    'sizeof static static_assert static_cast strong struct ' +
                    'super switch template this thread thread_local throw ' +
                    'true try typedef typeid typename union using uuid ' +
                    'virtual volatile weak whcar_t while ';

    var functions = 'abort abs acos asctime asin assert atan atan2 atexit ' +
                    'atof atoi atol bsearch calloc ceil clearerr clock cos ' +
                    'cosh ctime difftime div errno exit exp fabs fclose ' +
                    'feof ferror fflush fgetc fgetpos fgets floor fmod ' +
                    'fopen fprintf fputc fputs fread free freopen frexp ' +
                    'fscanf fseek fsetpos ftell fwrite getc getchar getenv ' +
                    'gets gmtime isalnum isalpha iscntrl isdigit isgraph ' +
                    'islower isprint ispunct isspace isupper isxdigit ' +
                    'jmp_buf labs ldexp ldiv localeconv localtime log ' +
                    'log10 longjmp malloc mblen mbstowcs mbtowc memchr ' +
                    'memcmp memcpy memmove memset mktime modf perror ' +
                    'pow printf putc putchar puts qsort raise rand ' +
                    'realloc remove rename rewind scanf setbuf setjmp ' +
                    'setlocale setvbuf sig_atomic_t signal sin sinh ' +
                    'sprintf sqrt srand sscanf strcat strchr strcmp ' +
                    'strcoll strcpy strcspn strerror strftime strlen ' +
                    'strncat strncmp strncpy strpbrk strrchr strspn ' +
                    'strstr strtod strtok strtol strtoul strxfrm system ' +
                    'tan tanh time tmpfile tmpnam tolower toupper ' +
                    'ungetc va_arg va_end va_start vfprintf vprintf ' +
                    'vsprintf wcstombs wctomb ';

    var pfx       = 'NS|UI|CG|object_';
    var pfx_ic    = 'objc_|dispatch_';

    this.regexList = [
      { regex: SyntaxHighlighter.regexLib.singleLineCComments, css: 'comments' },
      { regex: SyntaxHighlighter.regexLib.multiLineCComments,  css: 'comments' },
      { regex: SyntaxHighlighter.regexLib.doubleQuotedString,  css: 'string' },
      { regex: SyntaxHighlighter.regexLib.singleQuotedString,  css: 'string' },
      { regex: /^ *#.*/gm,                                     css: 'preprocessor' },
      { regex: new RegExp('@\\w+\\b', 'g'),                    css: 'objc_keyword bold' },
      { regex: /@/g,                                           css: 'string' },
      { regex: new RegExp('\.?\\b\\d+[a-z]?\\b', 'g'),         css: 'numbers' },
      { regex: new RegExp('\\b('+pfx+')\\w+\\b', 'g'),         css: 'cocoa_pfx bold' },
      { regex: new RegExp('\\b('+pfx_ic+')\\w+\\b', 'gi'),     css: 'cocoa_pfx bold' },
      { regex: new RegExp('\\b_?WJH\\w+\\b', 'gi'),            css: 'wjh_pfx bold' },

      { regex: new RegExp(this.getKeywords(datatypes), 'gm'),  css: 'datatypes bold' },
      { regex: new RegExp(this.getKeywords(functions), 'gm'),  css: 'functions bold' },
      { regex: new RegExp(this.getKeywords(keywords), 'gm'),   css: 'keyword bold' }
    ];
  };
 
  Brush.prototype = new SyntaxHighlighter.Highlighter();
  Brush.aliases   = ['objc', 'oc'];

  SyntaxHighlighter.brushes.Objc = Brush;
  // CommonJS
  typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();
