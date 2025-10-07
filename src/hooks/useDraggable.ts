import { useState, useRef, useEffect } from 'react';

interface Position {
  x: number;
  y: number;
}

interface UseDraggableOptions {
  initialX?: number;
  initialY?: number;
  playerWidth?: number;
  playerHeight?: number;
}

interface UseDraggableReturn {
  position: Position;
  isDragging: boolean;
  dragRef: React.RefObject<HTMLDivElement | null>;
  handleMouseDown: (e: React.MouseEvent) => void;
}

export const useDraggable = (options: UseDraggableOptions = {}): UseDraggableReturn => {
  const { initialX = 1041, initialY = 525, playerWidth = 360, playerHeight = 200 } = options;

  // Drag and drop state
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<Position>({ x: 0, y: 0 });

  // Set initial position
  useEffect(() => {
    const setInitialPosition = () => {
      let posX = initialX;
      let posY = initialY;

      // Ensure the position is within viewport bounds
      const viewportWidth = document.documentElement.clientWidth;
      const viewportHeight = document.documentElement.clientHeight;

      // Constrain to viewport if the fixed position is outside bounds
      posX = Math.max(0, Math.min(posX, viewportWidth - playerWidth));
      posY = Math.max(0, Math.min(posY, viewportHeight - playerHeight));

      setPosition({ x: posX, y: posY });
    };

    setInitialPosition();
    // Listen for resize to ensure it stays within bounds
    window.addEventListener('resize', setInitialPosition);

    return () => window.removeEventListener('resize', setInitialPosition);
  }, [initialX, initialY, playerWidth, playerHeight]);

  // Load saved position
  useEffect(() => {
    const savedPosition = localStorage.getItem('miniPlayerPosition');
    if (savedPosition) {
      try {
        const parsed = JSON.parse(savedPosition);
        // Ensure saved position is still within bounds
        const viewportWidth = document.documentElement.clientWidth;
        const viewportHeight = document.documentElement.clientHeight;
        const constrainedX = Math.max(0, Math.min(parsed.x, viewportWidth - playerWidth));
        const constrainedY = Math.max(0, Math.min(parsed.y, viewportHeight - playerHeight));
        setPosition({ x: constrainedX, y: constrainedY });
      } catch (error) {
        console.error('Error parsing saved position:', error);
      }
    }
  }, [playerWidth, playerHeight]);

  const savePosition = (newPosition: Position) => {
    localStorage.setItem('miniPlayerPosition', JSON.stringify(newPosition));
  };

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    e.preventDefault();
  };

  // Add global mouse event listeners
  useEffect(() => {
    if (isDragging) {
      const handleMouseMoveInternal = (e: MouseEvent) => {
        const newX = e.clientX - dragStartRef.current.x;
        const newY = e.clientY - dragStartRef.current.y;

        // Constrain to viewport bounds (excluding scrollbars)
        const viewportWidth = document.documentElement.clientWidth;
        const viewportHeight = document.documentElement.clientHeight;
        const maxX = viewportWidth - playerWidth;
        const maxY = viewportHeight - playerHeight;

        const constrainedPosition = {
          x: Math.max(0, Math.min(newX, maxX)),
          y: Math.max(0, Math.min(newY, maxY)),
        };

        setPosition(constrainedPosition);
      };

      const handleMouseUpInternal = () => {
        setIsDragging(false);
        // Save the current position after dragging ends
        const currentPos = { x: position.x, y: position.y };
        savePosition(currentPos);
      };

      document.addEventListener('mousemove', handleMouseMoveInternal);
      document.addEventListener('mouseup', handleMouseUpInternal);
      return () => {
        document.removeEventListener('mousemove', handleMouseMoveInternal);
        document.removeEventListener('mouseup', handleMouseUpInternal);
      };
    }
  }, [isDragging, position, playerWidth, playerHeight]);

  return {
    position,
    isDragging,
    dragRef,
    handleMouseDown,
  };
};